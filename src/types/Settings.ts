import { InformedAlgorithm, UninformedAlgorithm } from "./Algorithm";
import AlgorithmType from "./AlgorithmType";
interface Settings {
  interval: number;
  algorithmType: AlgorithmType;
  informedAlgorithm: InformedAlgorithm;
  uninformedAlgorithm: UninformedAlgorithm;
}

export default Settings;
