import React from "react";
import { LogBox } from "react-native";
import { firebaseApp } from "./app/utils/firebase";
import { decode, encode } from "base-64";
//components
import Navigation from "./app/navigations/Navigation";

LogBox.ignoreAllLogs();
if (!global.btoa) global.btoa = encode;
if (!global.atob) global.atob = decode;

export default function App() {
  return <Navigation />;
}
