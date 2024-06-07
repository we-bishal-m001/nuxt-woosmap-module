<template>
  <div
    id="map"
    :data-testid="props.dataTestid"
    ref="mapRef"
    :class="twMerge('w-full h-[500px]', props.class)"
  ></div>
</template>

<script setup lang="ts">
import { twMerge } from "tailwind-merge";

export type Marker = {
  lat: number;
  lng: number;
  content?: string;
  label?: string;
  iconUrl?: string;
};

type Props = {
  markers?: Marker[];
  mapCenter?: Omit<Marker, "content">;
  clusterOn?: boolean;
  zoomLevel?: number;
  class?: string;
  dataTestid?: string;
};

const props = withDefaults(defineProps<Props>(), {
  markers: () => [],
  mapCenter: () => ({
    lat: 51.50940214,
    lng: -0.133012,
  }),
  zoomLevel: 9,
  class: "",
  dataTestid: "woosmap-map-component",
});

//---- STATES
const mapRef = ref<HTMLElement | null>(null);

let map: woosmap.map.Map;

const isInfoBoxOpen = ref(false);

function initMap(): void {
  map = new woosmap.map.Map(mapRef.value as HTMLElement, {
    zoom: props.zoomLevel,
    center: props.mapCenter,
  });

  setMarkers();
}

//------ METHODS
function setMarkers() {
  if (!props.markers?.length) return;

  const randomIndex = Math.floor(Math.random() * props.markers.length);

  map.panTo({
    lat: props.markers[randomIndex].lat,
    lng: props.markers[randomIndex].lng,
  });

  /* SET MARKERS */
  props.markers.forEach((marker: Marker) => {
    const woosmapMarker: woosmap.map.Marker = putMarker(marker);

    woosmapMarker.setMap(map);

    if (marker.content?.length) setInfoBox(woosmapMarker, marker.content);
  });
}

function setInfoBox(woosmapMarker: woosmap.map.Marker, content: string) {
  // TODO
  closeInfoBox();
  const infoBox = new woosmap.map.InfoWindow({});

  infoBox.setOffset(new woosmap.map.Point(0, -40));
  infoBox.setContent(content);

  woosmapMarker.addListener("click", () => {
    infoBox.open(map, woosmapMarker.position);
  });
}

function closeInfoBox() {}

const putMarker = (marker: Marker): woosmap.map.Marker => {
  const markerPosition: woosmap.map.LatLngLiteral = {
    lat: marker.lat,
    lng: marker.lng,
  };

  return new window.woosmap.map.Marker({
    position: markerPosition,
    icon: {
      url: marker.iconUrl || "https://images.woosmap.com/icons/pin-red.png",
      scaledSize: {
        height: 38,
        width: 26,
      },
    },
    label: {
      text: marker.label ? `${marker.label}` : "",
      color: "white",
    },
  });
};

onMounted(() => {
  initMap();
});
</script>
