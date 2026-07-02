import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonInput, IonItem } from '@ionic/react';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

//Used AI to generate const home: React.FC = () => {  
const Home: React.FC = () => {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [roomCode, setRoomCode] = useState('');
// Used AI to generate const handleStartGame = () => {
  const handleStartGame = () => {
    if (!username || !roomCode) {
      alert('Please enter both username and room code.');
      return;
    }
    history.push('/game', { username, roomCode });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Celebrity Name Chain</IonTitle>
        </IonToolbar>
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
      </IonHeader>
      <IonContent className="ion-padding">
        <IonButton onClick={handleStartGame} expand="block" type="button">
          Start Game
        </IonButton>
      </IonContent>
    </IonPage>
  );
};
  
export default Home;
