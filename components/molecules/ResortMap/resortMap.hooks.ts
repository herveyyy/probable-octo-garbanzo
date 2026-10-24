import { useState, useEffect, useRef, useSyncExternalStore } from "react";
import type { ResortHighlight } from "@/lib/entities/resorts.type";
import type { MapRef } from "@vis.gl/react-maplibre";

interface UseResortMapProps {
  selectedResort: ResortHighlight | null;
  onSelectResort: (resort: ResortHighlight) => void;
}

const emptySubscribe = () => () => {};

export function useResortMap({
  selectedResort,
  onSelectResort,
}: UseResortMapProps) {
  const mapRef = useRef<MapRef | null>(null);
  const [activePopupResort, setActivePopupResort] = useState<ResortHighlight | null>(
    null
  );
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  // When selectedResort changes from outside (e.g. clicking a card in the list), smoothly fly to it
  useEffect(() => {
    if (selectedResort && mapRef.current) {
      mapRef.current.flyTo({
        center: [
          selectedResort.coordinates.longitude,
          selectedResort.coordinates.latitude,
        ],
        zoom: 14,
        duration: 1200,
      });
      setActivePopupResort(selectedResort);
    }
  }, [selectedResort]);

  const handleMarkerClick = (resort: ResortHighlight) => {
    onSelectResort(resort);
    setActivePopupResort(resort);
    if (mapRef.current) {
      mapRef.current.flyTo({
        center: [resort.coordinates.longitude, resort.coordinates.latitude],
        zoom: 14,
        duration: 900,
      });
    }
  };

  const handleClosePopup = () => {
    setActivePopupResort(null);
  };

  const handleResetView = () => {
    if (mapRef.current) {
      mapRef.current.flyTo({
        center: [123.571, 7.842],
        zoom: 12.5,
        duration: 1000,
      });
    }
    setActivePopupResort(null);
  };

  return {
    mapRef,
    isMounted,
    activePopupResort,
    handleMarkerClick,
    handleClosePopup,
    handleResetView,
  };
}
