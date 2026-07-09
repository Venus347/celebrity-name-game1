import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, useIonRouter, IonText } from '@ionic/react';
import React from 'react';
import { useLocation } from 'react-router-dom';

interface RouteState {
  username: string;
  roomCode: string;
  isHost?: boolean;
}

const Game: React.FC = () => {
  const router = useIonRouter();
  const location = useLocation<RouteState>();
  const { username, roomCode, isHost = false } = location.state || {
    username: 'Player',
    roomCode: 'Unknown',
    isHost: false,
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Game Room: {roomCode}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonText>
          <h2>Welcome, {username}!</h2>
          <p>{isHost ? 'You created this room. Share the code with friends to play together.' : 'You joined an existing room. Waiting for the host to start the game.'}</p>
          <p>Room code: <strong>{roomCode}</strong></p>
        </IonText>

        <IonButton expand="block" onClick={() => router.push('/home', 'back', 'push')}>
          Back to Home
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Game;