import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { StatusBar } from "expo-status-bar";

const GOAL = 20;

export default function App() {
  const [lane, setLane] = useState(1);
  const [coins, setCoins] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [message, setMessage] = useState("Sammle Münzen und spare für dein Ziel!");
  const reset = () => { setLane(1); setCoins(0); setExpenses(0); setMessage("Sammle Münzen und spare für dein Ziel!"); };
  const collect = () => { const next = coins + 1; setCoins(next); setMessage(next >= GOAL ? "Geschafft! Dein Sparziel ist erreicht." : "Prima! Du hast eine Münze gespart."); };
  const spend = () => { const next = expenses + 2; setExpenses(next); setMessage(next >= 15 ? "Achte auf unnötige Ausgaben. Starte noch einmal!" : "Das war eine Ausgabe. Überlege vor dem Kaufen."); };
  return <SafeAreaView style={styles.container}><StatusBar style="dark" /><View style={styles.header}><Text style={styles.title}>Geld-Abenteuer</Text><TouchableOpacity onPress={reset}><Text style={styles.restart}>Neu starten</Text></TouchableOpacity></View><View style={styles.stats}><Text>Münzen: {coins} / {GOAL}</Text><Text>Ausgaben: {expenses} / 15</Text></View><View style={styles.world}><Text style={styles.city}>🏘️   🌳   🏦</Text><Text style={[styles.player,{left: lane === 0 ? 50 : lane === 1 ? 155 : 260}]}>🧒</Text><Text style={styles.road}>════════════</Text><Text style={styles.help}>{message}</Text></View><View style={styles.controls}><TouchableOpacity style={styles.button} onPress={() => setLane(Math.max(0,lane-1))}><Text>⬅️</Text></TouchableOpacity><TouchableOpacity style={[styles.button,styles.coin]} onPress={collect}><Text>🪙 Sammeln</Text></TouchableOpacity><TouchableOpacity style={[styles.button,styles.expense]} onPress={spend}><Text>🛍️ Kaufen</Text></TouchableOpacity><TouchableOpacity style={styles.button} onPress={() => setLane(Math.min(2,lane+1))}><Text>➡️</Text></TouchableOpacity></View><Text style={styles.privacy}>Keine Konten, Werbung oder personenbezogenen Daten.</Text></SafeAreaView>;
}

const styles=StyleSheet.create({container:{flex:1,backgroundColor:"#e0f2fe",padding:18},header:{flexDirection:"row",justifyContent:"space-between",alignItems:"center"},title:{fontSize:25,fontWeight:"800",color:"#0f172a"},restart:{fontWeight:"700",color:"#2563eb"},stats:{flexDirection:"row",justifyContent:"space-between",marginTop:16,backgroundColor:"white",padding:14,borderRadius:14},world:{flex:1,marginTop:18,backgroundColor:"#93c5fd",borderRadius:24,alignItems:"center",paddingTop:60,overflow:"hidden"},city:{fontSize:42},player:{position:"absolute",bottom:145,fontSize:48},road:{position:"absolute",bottom:110,fontSize:27,color:"#475569"},help:{position:"absolute",bottom:45,textAlign:"center",paddingHorizontal:24,fontSize:16,fontWeight:"600",color:"#0f172a"},controls:{flexDirection:"row",gap:8,justifyContent:"center",marginVertical:16},button:{backgroundColor:"white",padding:13,borderRadius:14,alignItems:"center"},coin:{backgroundColor:"#fde68a"},expense:{backgroundColor:"#fecaca"},privacy:{fontSize:12,textAlign:"center",color:"#475569"}});