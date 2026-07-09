// ============================================
// Home.tsx — Celebrity Name Chain
// ============================================
// This is the landing page. Users can:
// 1. Enter a username
// 2. Create a new game room
// 3. Join an existing game room using a room code

import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonInput, IonItem, IonText } from '@ionic/react';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Home: React.FC = () => {
  const history = useHistory();

  const [username, setUsername] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [createdRoomCode, setCreatedRoomCode] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isJoining, setIsJoining] = useState(false);

  // Helper function to generate a random room code
  const generateRoomCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  // ============================================
  // CREATE ROOM — POST /api/games
  // ============================================
  const createRoom = async () => {
    if (!username.trim()) {
      alert('Please enter a username first.');
      return;
    }

    setIsCreating(true);

    // Generate a room code (or let the backend do it)
    const newRoomCode = generateRoomCode();

    try {
      const response = await fetch('http://localhost:3000/api/games', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomCode: newRoomCode }),
      });

      if (!response.ok) {
        throw new Error('Unable to create room.');
      }

      const data = await response.json();
      const generatedRoomCode = data.roomCode ?? newRoomCode;
      setCreatedRoomCode(generatedRoomCode);
      setRoomCode(generatedRoomCode);

      history.push('/game', { username, roomCode: generatedRoomCode, isHost: true });
    } catch (error) {
      console.error('Error creating room:', error);
      alert('We could not create a room right now. Please try again.');
    } finally {
      setIsCreating(false);
    }
  };

  // ============================================
  // JOIN ROOM — POST /api/players
  // ============================================
  const joinRoom = async () => {
    if (!username.trim() || !roomCode.trim()) {
      alert('Please enter both your username and a room code.');
      return;
    }

    setIsJoining(true);

    try {
      const response = await fetch(`http://localhost:3000/api/players`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomCode: roomCode.trim(), username }),
      });

      if (!response.ok) {
        throw new Error('Failed to join the room.');
      }

      const data = await response.json();
      console.log('Joined room:', data);

      history.push('/game', { username, roomCode: roomCode.trim(), isHost: false });
    } catch (error) {
      console.error('Error joining room:', error);
      alert('Failed to join the room. Please check the room code and try again.');
    } finally {
      setIsJoining(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Celebrity Name Chain</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonText>
          <h2>Celebrity Name Chain</h2>
          <p>Enter your username, create a room to get started!</p>
        </IonText>

        <IonItem>
          <IonInput
            label="Username"
            value={username}
            placeholder="Enter your username"
            onIonInput={(e) => setUsername(e.detail.value ?? '')}
          />
        </IonItem>

        <IonItem>
          <IonInput
            label="Room Code"
            value={roomCode}
            placeholder="Enter room code"
            onIonInput={(e) => setRoomCode(e.detail.value ?? '')}
          />
        </IonItem>

        <IonButton onClick={createRoom} expand="block" type="button" disabled={isCreating}>
          {isCreating ? 'Creating room...' : 'Create Room'}
        </IonButton>

        <IonButton onClick={joinRoom} expand="block" type="button" disabled={isJoining}>
          {isJoining ? 'Joining room...' : 'Join Room'}
        </IonButton>

        {createdRoomCode && (
          <IonItem lines="none">
            <IonText>
              <p>Your room code: <strong>{createdRoomCode}</strong></p>
            </IonText>
          </IonItem>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Home;