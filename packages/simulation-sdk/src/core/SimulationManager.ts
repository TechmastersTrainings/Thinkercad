import { ISimulatorDriver, SimulationStatus, PinStateChangeEvent } from './ISimulatorDriver';
import { CircuitGraph } from '@circuit/circuit-engine';

export class SimulationManager {
  private activeDriver: ISimulatorDriver | null = null;
  private statusListeners: Array<(status: SimulationStatus) => void> = [];
  private currentCircuit: CircuitGraph | null = null;

  public async registerAndInitDriver(driver: ISimulatorDriver, circuit: CircuitGraph): Promise<void> {
    if (this.activeDriver) {
      await this.activeDriver.stop();
    }
    this.activeDriver = driver;
    this.currentCircuit = circuit;
    await this.activeDriver.initialize(circuit);
    this.notifyStatusChange('IDLE');
  }

  public getActiveDriver(): ISimulatorDriver | null {
    return this.activeDriver;
  }

  public async loadFirmware(firmware: Uint8Array | string): Promise<void> {
    if (!this.activeDriver) throw new Error('No simulator driver registered');
    await this.activeDriver.loadFirmware(firmware);
  }

  public async startSimulation(): Promise<void> {
    if (!this.activeDriver) throw new Error('No simulator driver registered');
    await this.activeDriver.start();
    this.notifyStatusChange('RUNNING');
  }

  public async pauseSimulation(): Promise<void> {
    if (!this.activeDriver) return;
    await this.activeDriver.pause();
    this.notifyStatusChange('PAUSED');
  }

  public async stopSimulation(): Promise<void> {
    if (!this.activeDriver) return;
    await this.activeDriver.stop();
    this.notifyStatusChange('STOPPED');
  }

  public async resetSimulation(): Promise<void> {
    if (!this.activeDriver) return;
    await this.activeDriver.reset();
    this.notifyStatusChange('IDLE');
  }

  public onStatusChange(listener: (status: SimulationStatus) => void): () => void {
    this.statusListeners.push(listener);
    return () => {
      this.statusListeners = this.statusListeners.filter((l) => l !== listener);
    };
  }

  private notifyStatusChange(status: SimulationStatus): void {
    this.statusListeners.forEach((listener) => listener(status));
  }
}
