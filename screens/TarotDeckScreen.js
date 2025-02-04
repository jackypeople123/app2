import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  Dimensions,
  Image,
} from 'react-native';

const { width, height } = Dimensions.get('window');
const CARD_WIDTH = width * 0.4; // Increased card width
const CARD_HEIGHT = height * 0.3; // Increased card height
const VISIBLE_CARDS = 20; // More cards for the arc

const TarotDeckScreen = ({ navigation }) => {
  const [selectedCard, setSelectedCard] = useState(null);

  // Generate positions for cards in a semicircle
  const cards = Array.from({ length: VISIBLE_CARDS }, (_, index) => {
    // Calculate angle for semicircle arrangement (180 degrees)
    const angle = (Math.PI / 2) * (index / (VISIBLE_CARDS - 3)) - Math.PI / 1.5;
    const radius = height * 0.3; // Adjusted radius
    
    return {
      id: index,
      // Rotate cards to face outward
      rotation: ((index / (VISIBLE_CARDS - 1)) * 90 - 45),
      // Position cards in a semicircle
      x: radius * Math.cos(angle),
      y: radius * Math.sin(angle) + height * 0.2, // Moved cards up
    };
  });

  const renderCard = (card, index) => {
    return (
      <Animated.View
        key={card.id}
        style={[
          styles.card,
          {
            transform: [
              { translateX: card.x },
              { translateY: card.y },
              { rotate: `${card.rotation}deg` },
            ],
            // Add overlapping effect
            zIndex: VISIBLE_CARDS - index,
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => {
            setSelectedCard(card.id);
            navigation.navigate('NextScreen', { selectedCard: card.id });
          }}
        >
          <View style={styles.cardInner}>
            {/* Add decorative pattern */}
            <View style={styles.cardPattern} />
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Tarot Deck Preview</Text>
        <Text style={styles.subtitle}>
          Hi, your Tarot deck is ready!{'\n'}
          This is the deck you'll be using for your future readings.
        </Text>

        <View style={styles.deckContainer}>
          {cards.map((card, index) => renderCard(card, index))}
        </View>

        <TouchableOpacity
          style={styles.beginButton}
          onPress={() => navigation.navigate('NextScreen')}
        >
          <Text style={styles.beginButtonText}>Begin Tarot Journey</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    color: 'white',
    textAlign: 'center',
    marginTop: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 40,
  },
  deckContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    position: 'relative',
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    position: 'absolute',
    borderRadius: 10,
    backgroundColor: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#333',
  },
  cardInner: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#1a1a1a',
  },
  cardPattern: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: '#1a1a1a',
    borderWidth: 4,
    borderColor: '#B8860B', // Dark golden color
    opacity: 0.5,
  },
  beginButton: {
    width: '100%',
    height: 56,
    backgroundColor: '#5C5CFF',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  beginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default TarotDeckScreen; 