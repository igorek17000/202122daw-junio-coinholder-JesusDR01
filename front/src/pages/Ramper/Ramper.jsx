import { THEMES } from "constants/portfolio";
import { useGetTheme } from "hooks/theme/useGetTheme";
import React, { useState, useEffect } from "react";
import { useMoralis } from "react-moralis";
import { StyledRamper } from "./Ramper.styled";

export const RamperScreen = () => {
  const [ramper, setRamper] = useState();
  const {theme} = useGetTheme();
  useGetTheme
  const { Moralis } = useMoralis();
  useEffect(() => {
    if (!Moralis?.["Plugins"]?.["fiat"]) return null;
    async function initPlugin() {
      Moralis.Plugins.fiat
        .buy({}, { disableTriggers: true })
        .then((data) => setRamper(data.data));
    }
    initPlugin();
  }, [Moralis.Plugins]);

  return (
    <StyledRamper
    className="animate__animated animate__fadeIn"
      src={theme === THEMES.LIGHT ? ramper : ramper?.concat('&darkMode=true')}
      title="ramper"
      frameBorder="no"
      allow="accelerometer; autoplay; camera; gyroscope; payment;"
    />
  );
}