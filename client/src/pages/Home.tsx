import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonInput, IonItem, IonList, Controller } from '@ionic/react';
import { useForm} from 'react-hook-form';

const Home = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: ''
    }
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Celebrity Name Chain</IonTitle>
        </IonToolbar>
         <IonItem>
        <IonInput label="Username:" placeholder="Enter your username"></IonInput>
      </IonItem>
      </IonHeader>
      <IonContent fullscreen>
          <IonButton expand="block" type="submit">Start Game</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;
