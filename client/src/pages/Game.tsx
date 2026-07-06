import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, useIonRouter } from '@ionic/react';
import React from 'react';
import { useLocation } from 'react-router-dom';


//Used AI to generate interface RouteState {
interface RouteState {
  username: string;
  roomCode: string;
}

const Game: React.FC = () => {
  const router = useIonRouter();
  const location = useLocation<RouteState>();
  const {username, roomCode} = location.state || { username: 'Player', roomCode: 'Unknown' };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Game Room: {roomCode}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h2>Welcome, {username}!</h2>
        <p>The game will begin shortly.</p>
        <IonButton expand="block" onClick={() => router.push('/home', 'back', 'push')}>
          Back to Home
        </IonButton>
      </IonContent>
    </IonPage>
  );
};
export default Game;