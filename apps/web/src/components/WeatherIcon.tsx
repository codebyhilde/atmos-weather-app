import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudMoon,
  CloudRain,
  CloudSnow,
  CloudSun,
  Moon,
  Sun,
  ThermometerSun
} from "lucide-react";

interface WeatherIconProps {
  code: string;
  className?: string;
}

export function WeatherIcon({ code, className }: WeatherIconProps) {
  const iconCode = code.substring(0, 2);
  const isDay = code.endsWith("d");

  const getIcon = () => {
    switch (iconCode) {
      // 01: Cielos despejados
      case "01":
        return isDay ? Sun : Moon;

      // 02: Pocas nubes
      case "02":
        return isDay ? CloudSun : CloudMoon;

      // 03, 04: Nublado
      case "03":
      case "04":
        return Cloud;

      // 09, 10: Lluvia
      case "09":
      case "10":
        return isDay ? CloudRain : CloudDrizzle;

      // 11: Tormenta
      case "11":
        return CloudLightning;

      // 13: Nieve
      case "13":
        return CloudSnow;

      // 50: Niebla
      case "50":
        return CloudFog;

      default:
        return ThermometerSun;
    }
  };

  const IconComponent = getIcon();

  return <IconComponent className={className} />;
};