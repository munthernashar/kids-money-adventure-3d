import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, Dimensions, TouchableOpacity, Modal } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Box, Sphere } from '@react-three/drei';
import * as THREE from 'three';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const GOAL = 20;
const LANE_WIDTH = 2.5;

export default function App() {
  const [ageGroup, setAgeGroup] = useState<'under13' | 'over13' | null>(null);
  const [showAgeModal, setShowAgeModal] = useState(true);
  const [playerLane, setPlayerLane] = useState(0);
  const [coins, setCoins] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAgeSelect = (isUnder13: boolean) => {
    setAgeGroup(isUnder13 ? 'under13' : 'over13');
    setShowAgeModal(false);
  };

  const resetGame = () => {
    setCoins(0);
    setExpenses(0);
    setGameOver(false);
    setShowSuccess(false);
    setPlayerLane(0);
  };

  const moveLeft = () => setPlayerLane(l => Math.max(l - 1, -1));
  const moveRight = () => setPlayerLane(l => Math.min(l + 1, 1));

  useEffect(() => {
    if (coins >= GOAL && !showSuccess && !gameOver) setShowSuccess(true);
    if (expenses >= 15 && !gameOver && !showSuccess) setGameOver(true);
  }, [coins, expenses]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <Modal visible={showAgeModal} transparent animationType="fade">
        <View style={styles.ageModal}>
          <View style={styles.ageBox}>
            <Text style={styles.ageTitle}>Wie alt bist du?</Text>
            <View style={styles.ageButtons}>
              <TouchableOpacity style={styles.ageButton} onPress={() => handleAgeSelect(true)}>
                <Text style={styles.ageButtonText}>Unter 13</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.ageButton} onPress={() => handleAgeSelect(false)}>
                <Text style={styles.ageButtonText}>13 oder älter</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.ageNote}>Diese App speichert keine persönlichen Daten.</Text>
          </View>
        </View>
      </Modal>

      <View style={styles.header}>
        <Text style={styles.title}>💰 Geld-Abenteuer 3D</Text>
        <TouchableOpacity onPress={resetGame} style={styles.resetButton}>
          <Text style={styles.resetText}>Neu</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>MÃ¼nzen</Text>
          <Text style={styles.statValue}>{coins} / {GOAL}</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Ausgaben</Text>
          <Text style={styles.statValue}>{expenses} / 15</Text>
        </View>
      </View>

      <View style={styles.gameContainer}>
        <Canvas camera={{ position: [0, 4, 8], fov: 60 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 8, 5]} intensity={0.8} />
          
          {/* Boden */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -5]}>
            <planeGeometry args={[20, 30]} />
            <meshStandardMaterial color="#3b82f6" />
          </mesh>

          {/* Spieler */}
          <Box position={[playerLane * LANE_WIDTH, 0.5, 0]} args={[0.8, 1, 0.8]}>
            <meshStandardMaterial color="#22c55e" />
          </Box>

          {/* MÃ¼nzen */}
          <Sphere position={[-LANE_WIDTH, 0.4, -5]} args={[0.3]}>
            <meshStandardMaterial color="#fbbf24" metalness={0.8} roughness={0.2} />
          </Sphere>
          <Sphere position={[LANE_WIDTH, 0.4, -8]} args={[0.3]}>
            <meshStandardMaterial color="#fbbf24" metalness={0.8} roughness={0.2} />
          </Sphere>

          {/* Ausgaben */}
          <Sphere position={[0, 0.4, -12]} args={[0.35]}>
            <meshStandardMaterial color="#ef4444" />
          </Sphere>

          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>

        <View style={styles.controls}>
          <TouchableOpacity style={styles.controlButton} onPress={moveLeft}>
            <Text style={styles.controlText}>⬅️</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlButton} onPress={moveRight}>
            <Text style={styles.controlText}>➡️</Text>
          </TouchableOpacity>
        </View>
      </View>

      {gameOver && (
        <View style={styles.overlay}>
          <Text style={styles.overlayTitle}>Game Over</Text>
          <Text style={styles.overlayText}>Zu viele Ausgaben!</Text>
          <TouchableOpacity style={styles.overlayButton} onPress={resetGame}>
            <Text style={styles.overlayButtonText}>Nochmal</Text>
          </TouchableOpacity>
        </View>
      )}

      {showSuccess && (
        <View style={styles.overlaySuccess}>
          <Text style={styles.overlayTitle}>🎉 Geschafft!</Text>
          <Text style={styles.overlayText}>Sparziel erreicht!</Text>
          <TouchableOpacity style={styles.overlayButton} onPress={resetGame}>
            <Text style={styles.overlayButtonText}>Weiter</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.footer}>
        <Text style={styles.footerText}>Keine personenbezogenen Daten. COPPA-Basis.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f9ff' },
  ageModal: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.4)' },
  ageBox: { width: WIDTH * 0.85, backgroundColor: '#fff', borderRadius: 16, padding: 20, alignItems: 'center' },
  ageTitle: { fontSize: 20, fontWeight: '700', marginBottom: 16 },
  ageButtons: { flexDirection: 'row', gap: 12 },
  ageButton: { backgroundColor: '#4f46e5', paddingHorizontal: 18, paddingVertical: 10, borderRadius: 10 },
  ageButtonText: { color: '#fff', fontWeight: '600' },
  ageNote: { fontSize: 12, color: '#666', textAlign: 'center', marginTop: 12 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingTop: 10 },
  title: { fontSize: 22, fontWeight: '800', color: '#111827' },
  resetButton: { backgroundColor: '#e5e7eb', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  resetText: { color: '#111827', fontWeight: '600' },
  statsRow: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10 },
  statBox: { backgroundColor: '#fff', borderRadius: 12, padding: 10, alignItems: 'center', width: 120 },
  statLabel: { fontSize: 12, color: '#6b7280' },
  statValue: { fontSize: 18, fontWeight: '800', color: '#111827' },
  gameContainer: { flex: 1, position: 'relative' },
  controls: { position: 'absolute', bottom: 20, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-around' },
  controlButton: { backgroundColor: '#fff', borderRadius: 50, padding: 18, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  controlText: { fontSize: 24 },
  overlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignItems: 'center' },
  overlaySuccess: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(34,197,94,0.9)', justifyContent: 'center', alignItems: 'center' },
  overlayTitle: { fontSize: 32, fontWeight: '800', color: '#fff', marginBottom: 10 },
  overlayText: { fontSize: 16, color: '#fff', marginBottom: 16 },
  overlayButton: { backgroundColor: '#111827', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 10 },
  overlayButtonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  footer: { paddingHorizontal: 16, paddingBottom: 16 },
  footerText: { fontSize: 11, color: '#6b7280', textAlign: 'center' },
});
