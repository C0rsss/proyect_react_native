import React, {useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Alert,
  ScrollView,
  Animated,
} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

// Type definitions
type AnimatedButtonProps = {
  title: string;
  onPress: () => void;
  color: string;
  icon: string;
};

type ElementButtonProps = {
  element: string;
  color: string;
  onPress: () => void;
};

type Character = {
  name: string;
  element: string;
  color: string;
};

type ElementType = {
  name: string;
  color: string;
  icon: string;
};

// AnimatedButton component
const AnimatedButton: React.FC<AnimatedButtonProps> = ({title, onPress, color, icon}) => {
  const [scaleValue] = useState(new Animated.Value(1));

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={{transform: [{scale: scaleValue}]}}>
      <TouchableOpacity
        style={[styles.animatedButton, {backgroundColor: color}]}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonIcon}>{icon}</Text>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

// ElementButton component
const ElementButton: React.FC<ElementButtonProps> = ({element, color, onPress}) => {
  return (
    <TouchableOpacity
      style={[styles.elementButton, {backgroundColor: color}]}
      onPress={onPress}
    >
      <Text style={styles.elementText}>{element}</Text>
    </TouchableOpacity>
  );
};

const elements: ElementType[] = [
  {name: 'Geo', color: '#F39C12', icon: '🗻'},
  {name: 'Pyro', color: '#E74C3C', icon: '🔥'},
  {name: 'Anemo', color: '#58D68D', icon: '🌪️'},
  {name: 'Cryo', color: '#85C1E9', icon: '❄️'},
  {name: 'Electro', color: '#BB8FCE', icon: '⚡'},
  {name: 'Hydro', color: '#5DADE2', icon: '💧'},
  {name: 'Dendro', color: '#27AE60', icon: '🌿'},
];

const App = () => {
  const [selectedCharacter, setSelectedCharacter] = useState('Ninguno');

  const characters: Character[] = [
    {name: 'Zhongli', element: 'Geo', color: '#F4D03F'},
    {name: 'Diluc', element: 'Pyro', color: '#E74C3C'},
    {name: 'Venti', element: 'Anemo', color: '#58D68D'},
    {name: 'Ganyu', element: 'Cryo', color: '#85C1E9'},
    {name: 'Raiden', element: 'Electro', color: '#BB8FCE'},
  ];

  const handleCharacterSelect = (character: Character) => {
    setSelectedCharacter(character.name);
    Alert.alert(
      `¡${character.name} seleccionado!`,
      `Has elegido a ${character.name}, un usuario de ${character.element}`,
      [{text: 'Genial!', style: 'default'}],
    );
  };

  const handleElementPress = (element: ElementType) => {
    Alert.alert(
      `Elemento ${element.name}`,
      `Has seleccionado el elemento ${element.name} ${element.icon}`,
      [{text: 'Entendido', style: 'default'}],
    );
  };

  const handleWishPress = () => {
    const randomCharacter =
      characters[Math.floor(Math.random() * characters.length)];
    Alert.alert(
      '🌟 ¡Wish Result! 🌟',
      `¡Felicidades! Has obtenido a ${randomCharacter.name} (${randomCharacter.element})`,
      [{text: '¡Increíble!', style: 'default'}],
    );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.mainTitle}>⚔️ GENSHIN IMPACT ⚔️</Text>
            <Text style={styles.subtitle}>¡Bienvenido a Teyvat, Viajero!</Text>
          </View>

          {/* Character Selection */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🎭 Selecciona tu Personaje</Text>
            <Text style={styles.selectedText}>
              Personaje actual: {selectedCharacter}
            </Text>
            <View style={styles.characterGrid}>
              {characters.map((character, index) => (
                <AnimatedButton
                  key={index}
                  title={character.name}
                  color={character.color}
                  icon="⚔️"
                  onPress={() => handleCharacterSelect(character)}
                />
              ))}
            </View>
          </View>

          {/* Elements */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🌟 Elementos de Teyvat</Text>
            <View style={styles.elementsContainer}>
              {elements.map((element, index) => (
                <ElementButton
                  key={index}
                  element={`${element.icon} ${element.name}`}
                  color={element.color}
                  onPress={() => handleElementPress(element)}
                />
              ))}
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🎲 Acciones Especiales</Text>

            <AnimatedButton
              title="Hacer Wish"
              color="#FF6B9D"
              icon="✨"
              onPress={handleWishPress}
            />

            <View style={styles.actionRow}>
              <AnimatedButton
                title="Dominio"
                color="#4ECDC4"
                icon="🏛️"
                onPress={() =>
                  Alert.alert(
                    '¡Entrando al dominio!',
                    '⚔️ Prepárate para la batalla',
                  )
                }
              />
              <AnimatedButton
                title="Explorar"
                color="#45B7D1"
                icon="🗺️"
                onPress={() =>
                  Alert.alert(
                    '¡Explorando!',
                    '🧭 Descubriendo nuevos lugares en Teyvat',
                  )
                }
              />
            </View>

            <AnimatedButton
              title="Abrir Cofre Legendario"
              color="#FFD93D"
              icon="📦"
              onPress={() =>
                Alert.alert(
                  '🎁 ¡Cofre Abierto!',
                  '💎 Has encontrado materiales raros',
                )
              }
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F1419',
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    paddingVertical: 20,
    backgroundColor: '#1A2332',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFD700',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#87CEEB',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  section: {
    marginBottom: 25,
    backgroundColor: '#1A2332',
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: '#2C3E50',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 15,
    textAlign: 'center',
  },
  selectedText: {
    fontSize: 16,
    color: '#87CEEB',
    textAlign: 'center',
    marginBottom: 15,
    fontWeight: '600',
  },
  characterGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
  },
  animatedButton: {
    backgroundColor: '#3498DB',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '45%',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  buttonIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  elementsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    gap: 8,
  },
  elementButton: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginVertical: 4,
    minWidth: '30%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  elementText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
});

export default App;