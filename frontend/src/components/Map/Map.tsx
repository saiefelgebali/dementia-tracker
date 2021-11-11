import { Component, createEffect } from "solid-js";
import { GoogleMap, MapsJSAPIOptions } from "@googlemaps/map-loader";
import { MapLoaderOptions } from "@googlemaps/map-loader/dist/map-loader";
import { googleMapsAPIKey } from "../../api.secret";
import styles from "./Map.module.scss";

const castPosition: google.maps.LatLngLiteral = {
	lat: 52.1780726,
	lng: 0.1349691402320342,
};

async function initMap(
	callback?: MapsCallback,
	options?: {
		polygonInitial?: google.maps.LatLngLiteral[];
	}
) {
	// options for initial render
	const mapOptions: google.maps.MapOptions = {
		center:
			(options?.polygonInitial && options.polygonInitial[0]) ||
			castPosition,
		zoom: 18,
		fullscreenControlOptions: {
			position: 12.0,
		},
		mapTypeControlOptions: {
			position: 3.0,
		},
		maxZoom: 32,
		minZoom: 2,
		restriction: {
			latLngBounds: {
				north: 85,
				south: -85,
				west: -179,
				east: 179,
			},
		},
	};

	// options for loading the Maps JS API
	const apiOptions: MapsJSAPIOptions = {
		version: "weekly",
	};

	// set id for container div
	const mapLoaderOptions: MapLoaderOptions = {
		apiKey: googleMapsAPIKey,
		divId: "map-container",
		mapOptions,
		apiOptions,
	};

	// add polygon control

	const mapLoader = new GoogleMap();

	const map = (await mapLoader.initMap(mapLoaderOptions)) as google.maps.Map;

	// add polygon
	const polygon = new google.maps.Polygon({ map, editable: true });

	polygon.setPath(options?.polygonInitial || []);

	// add vertices on click
	map.addListener("click", (e: google.maps.MapMouseEvent) => {
		// only allow if no polygon
		if (polygon.getPath().getLength() > 2) return;
		const position = e.latLng;
		const newPath = polygon.getPath();
		newPath.push(position);
		polygon.setPath(newPath);
	});

	callback && callback(map, polygon);

	return map;
}

type MapsCallback = (
	map: google.maps.Map,
	polygon: google.maps.Polygon
) => void;

interface MapProps {
	polygonInitial?: google.maps.LatLngLiteral[];
	callback?: MapsCallback;
}

const Map: Component<MapProps> = ({ callback, polygonInitial }) => {
	createEffect(async () => {
		await initMap(callback, { polygonInitial });
	});

	return <div id='map-container' class={styles.mapContainer}></div>;
};

export default Map;
