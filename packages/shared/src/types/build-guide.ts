export interface BOMItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  estimatedPriceUSD: number;
  datasheetUrl?: string;
  notes?: string;
}

export interface PhysicalWireInstruction {
  stepNumber: number;
  fromComponentLabel: string;
  fromPinLabel: string;
  toComponentLabel: string;
  toPinLabel: string;
  recommendedColor: string;
  description: string;
}

export interface BreadboardBuildGuide {
  projectId: string;
  title: string;
  bom: BOMItem[];
  wiringSteps: PhysicalWireInstruction[];
  totalEstimatedCostUSD: number;
  safetyWarnings: string[];
}
