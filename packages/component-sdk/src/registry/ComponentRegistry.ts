import { ComponentDefinition } from '@circuit/shared';
import { ResistorComponent } from '../components/resistor';
import { LEDComponent } from '../components/led';
import { RGBLEDComponent } from '../components/rgb-led';
import { PushbuttonComponent } from '../components/pushbutton';
import { PotentiometerComponent } from '../components/potentiometer';
import { BuzzerComponent } from '../components/buzzer';
import { UltrasonicHCSR04Component } from '../components/ultrasonic-hcsr04';
import { LCD1602Component } from '../components/lcd1602';
import { SSD1306OLEDComponent } from '../components/oled-ssd1306';
import { ServoComponent } from '../components/servo';
import { DCMotorComponent } from '../components/dc-motor';
import { StepperMotorComponent } from '../components/stepper-motor';
import { RelayComponent } from '../components/relay';
import { DHT11Component } from '../components/dht11';
import { RFIDRC522Component } from '../components/rfid-rc522';
import { Keypad4x4Component } from '../components/keypad-4x4';
import { GPSNEO6MComponent } from '../components/gps-neo6m';
import { GSMSIM800LComponent } from '../components/gsm-sim800l';
import { WiFiESP8266Component } from '../components/wifi-esp8266';
import { CapacitorComponent } from '../components/capacitor';
import { PIRMotionComponent } from '../components/pir-motion';
import { LDRSensorComponent } from '../components/ldr-sensor';
import { MPU6050Component } from '../components/mpu6050';
import { CameraOV2640Component } from '../components/camera-ov2640';
import { MQ2GasSensorComponent } from '../components/mq2-gas-sensor';
import { DHT22Component } from '../components/dht22';
import { SoilMoistureComponent } from '../components/soil-moisture';
import { IRObstacleComponent } from '../components/ir-obstacle';
import { HC05BluetoothComponent } from '../components/hc05-bluetooth';
import { L298NMotorDriverComponent } from '../components/l298n-motor-driver';

import {
  PolarizedCapacitorComponent,
  DiodeComponent,
  ZenerDiodeComponent,
  InductorComponent,
  SlideSwitchComponent,
  Tmp36SensorComponent,
  TiltSensorComponent,
  LightBulbComponent,
  NeoPixelRingComponent,
  HobbyGearmotorComponent,
  SevenSegmentComponent,
  FlexSensorComponent,
  ForceSensorComponent,
  Battery9VComponent,
  BatteryAAComponent,
  BatteryCoinComponent,
  SolarCellComponent,
  PotatoBatteryComponent,
  LemonBatteryComponent,
  BreadboardFullComponent,
  BreadboardSmallComponent,
  BreadboardMiniComponent,
  MultimeterComponent,
  PowerSupplyComponent,
  FunctionGeneratorComponent,
  OscilloscopeComponent,
  Timer555Component,
  Timer556Component,
  OpAmp741Component,
  QuadComparatorLM339Component,
  DualComparatorLM393Component,
  Optocoupler4N35Component,
  NPNTransistorComponent,
  PNPTransistorComponent,
  SmallSignalNMOSComponent,
  SmallSignalPMOSComponent,
  NMOSTransistorComponent,
  PMOSTransistorComponent,
  TIP120Component,
  RelaySPDTComponent,
  RelayDPDTComponent,
  VoltageRegulator5VComponent,
  VoltageRegulator3V3Component,
  HBridgeMotorDriverL293DComponent,
  Header8PinComponent,
  USBStandardAComponent,
  Logic74HC00Component,
  Logic74HC02Component,
  Logic74HC08Component,
  Logic74HC32Component,
  Logic74HC86Component,
  Logic74HC04Component,
  Logic74HC14Component,
  Logic74HC132Component,
  Logic74HC10Component,
  Logic74HC11Component,
  Logic74HC27Component,
  Logic74HC20Component,
  Logic74HC21Component,
  Logic74HC73Component,
  Logic74HC74Component,
  Logic74HC75Component,
  Logic74HC93Component,
  Logic74HC283Component,
  Logic74HC595Component,
  Logic74HC4017Component,
  LogicCD4511Component,
  LogicPCF8574Component,
} from '../components/extended-tinkercad-components';

export class ComponentRegistry {
  private static components: Map<string, ComponentDefinition> = new Map([
    [ResistorComponent.id, ResistorComponent],
    [CapacitorComponent.id, CapacitorComponent],
    [PolarizedCapacitorComponent.id, PolarizedCapacitorComponent],
    [DiodeComponent.id, DiodeComponent],
    [ZenerDiodeComponent.id, ZenerDiodeComponent],
    [InductorComponent.id, InductorComponent],
    [LEDComponent.id, LEDComponent],
    [RGBLEDComponent.id, RGBLEDComponent],
    [LightBulbComponent.id, LightBulbComponent],
    [NeoPixelRingComponent.id, NeoPixelRingComponent],
    [PushbuttonComponent.id, PushbuttonComponent],
    [SlideSwitchComponent.id, SlideSwitchComponent],
    [PotentiometerComponent.id, PotentiometerComponent],
    [BuzzerComponent.id, BuzzerComponent],
    [UltrasonicHCSR04Component.id, UltrasonicHCSR04Component],
    [DHT11Component.id, DHT11Component],
    [DHT22Component.id, DHT22Component],
    [Tmp36SensorComponent.id, Tmp36SensorComponent],
    [MQ2GasSensorComponent.id, MQ2GasSensorComponent],
    [SoilMoistureComponent.id, SoilMoistureComponent],
    [TiltSensorComponent.id, TiltSensorComponent],
    [IRObstacleComponent.id, IRObstacleComponent],
    [PIRMotionComponent.id, PIRMotionComponent],
    [LDRSensorComponent.id, LDRSensorComponent],
    [FlexSensorComponent.id, FlexSensorComponent],
    [ForceSensorComponent.id, ForceSensorComponent],
    [MPU6050Component.id, MPU6050Component],
    [CameraOV2640Component.id, CameraOV2640Component],
    [LCD1602Component.id, LCD1602Component],
    [SSD1306OLEDComponent.id, SSD1306OLEDComponent],
    [SevenSegmentComponent.id, SevenSegmentComponent],
    [ServoComponent.id, ServoComponent],
    [DCMotorComponent.id, DCMotorComponent],
    [HobbyGearmotorComponent.id, HobbyGearmotorComponent],
    [StepperMotorComponent.id, StepperMotorComponent],
    [L298NMotorDriverComponent.id, L298NMotorDriverComponent],
    [RelayComponent.id, RelayComponent],
    [RFIDRC522Component.id, RFIDRC522Component],
    [Keypad4x4Component.id, Keypad4x4Component],
    [GPSNEO6MComponent.id, GPSNEO6MComponent],
    [GSMSIM800LComponent.id, GSMSIM800LComponent],
    [WiFiESP8266Component.id, WiFiESP8266Component],
    [HC05BluetoothComponent.id, HC05BluetoothComponent],
    [Battery9VComponent.id, Battery9VComponent],
    [BatteryAAComponent.id, BatteryAAComponent],
    [BatteryCoinComponent.id, BatteryCoinComponent],
    [SolarCellComponent.id, SolarCellComponent],
    [PotatoBatteryComponent.id, PotatoBatteryComponent],
    [LemonBatteryComponent.id, LemonBatteryComponent],
    [BreadboardFullComponent.id, BreadboardFullComponent],
    [BreadboardSmallComponent.id, BreadboardSmallComponent],
    [BreadboardMiniComponent.id, BreadboardMiniComponent],
    [MultimeterComponent.id, MultimeterComponent],
    [PowerSupplyComponent.id, PowerSupplyComponent],
    [FunctionGeneratorComponent.id, FunctionGeneratorComponent],
    [OscilloscopeComponent.id, OscilloscopeComponent],
    [Timer555Component.id, Timer555Component],
    [Timer556Component.id, Timer556Component],
    [OpAmp741Component.id, OpAmp741Component],
    [QuadComparatorLM339Component.id, QuadComparatorLM339Component],
    [DualComparatorLM393Component.id, DualComparatorLM393Component],
    [Optocoupler4N35Component.id, Optocoupler4N35Component],
    [NPNTransistorComponent.id, NPNTransistorComponent],
    [PNPTransistorComponent.id, PNPTransistorComponent],
    [SmallSignalNMOSComponent.id, SmallSignalNMOSComponent],
    [SmallSignalPMOSComponent.id, SmallSignalPMOSComponent],
    [NMOSTransistorComponent.id, NMOSTransistorComponent],
    [PMOSTransistorComponent.id, PMOSTransistorComponent],
    [TIP120Component.id, TIP120Component],
    [RelaySPDTComponent.id, RelaySPDTComponent],
    [RelayDPDTComponent.id, RelayDPDTComponent],
    [VoltageRegulator5VComponent.id, VoltageRegulator5VComponent],
    [VoltageRegulator3V3Component.id, VoltageRegulator3V3Component],
    [HBridgeMotorDriverL293DComponent.id, HBridgeMotorDriverL293DComponent],
    [Header8PinComponent.id, Header8PinComponent],
    [USBStandardAComponent.id, USBStandardAComponent],
    [Logic74HC00Component.id, Logic74HC00Component],
    [Logic74HC02Component.id, Logic74HC02Component],
    [Logic74HC08Component.id, Logic74HC08Component],
    [Logic74HC32Component.id, Logic74HC32Component],
    [Logic74HC86Component.id, Logic74HC86Component],
    [Logic74HC04Component.id, Logic74HC04Component],
    [Logic74HC14Component.id, Logic74HC14Component],
    [Logic74HC132Component.id, Logic74HC132Component],
    [Logic74HC10Component.id, Logic74HC10Component],
    [Logic74HC11Component.id, Logic74HC11Component],
    [Logic74HC27Component.id, Logic74HC27Component],
    [Logic74HC20Component.id, Logic74HC20Component],
    [Logic74HC21Component.id, Logic74HC21Component],
    [Logic74HC73Component.id, Logic74HC73Component],
    [Logic74HC74Component.id, Logic74HC74Component],
    [Logic74HC75Component.id, Logic74HC75Component],
    [Logic74HC93Component.id, Logic74HC93Component],
    [Logic74HC283Component.id, Logic74HC283Component],
    [Logic74HC595Component.id, Logic74HC595Component],
    [Logic74HC4017Component.id, Logic74HC4017Component],
    [LogicCD4511Component.id, LogicCD4511Component],
    [LogicPCF8574Component.id, LogicPCF8574Component],
  ]);

  public static registerComponent(component: ComponentDefinition): void {
    this.components.set(component.id, component);
  }

  public static getComponent(id: string): ComponentDefinition | undefined {
    return this.components.get(id);
  }

  public static getAllComponents(): ComponentDefinition[] {
    return Array.from(this.components.values());
  }

  public static getComponentsByCategory(category: string): ComponentDefinition[] {
    return Array.from(this.components.values()).filter((c) => c.category === category);
  }
}
