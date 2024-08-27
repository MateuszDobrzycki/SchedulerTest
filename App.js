import React, { useState, useEffect } from 'react';
import { db, collection, addDoc, getDocs, Timestamp } from './firebase';
import {
  Scheduler,
  WeekView,
  Appointments,
  AppointmentForm,
  EditingState
} from '@aldabil/react-scheduler';

function App() {
  const [schedulerData, setSchedulerData] = useState([]);

  const fetchAppointments = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'appointments'));
      const appointments = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title || 'Brak tytułu',
          startDate: data.startDate ? data.startDate.toDate() : new Date(),
          endDate: data.endDate ? data.endDate.toDate() : new Date()
        };
      });
      setSchedulerData(appointments);
    } catch (e) {
      console.error('Błąd przy pobieraniu spotkań: ', e);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleAddAppointment = async (appointment) => {
    try {
      console.log('Dodawanie spotkania:', appointment);
      const docRef = await addDoc(collection(db, 'appointments'), {
        title: appointment.title,
        startDate: Timestamp.fromDate(new Date(appointment.startDate)),
        endDate: Timestamp.fromDate(new Date(appointment.endDate))
      });
      console.log('Spotkanie dodane pomyślnie, ID dokumentu:', docRef.id);
      fetchAppointments();
    } catch (e) {
      console.error('Błąd przy dodawaniu spotkania: ', e);
    }
  };
  handleAddAppointment({
    title: 'Test',
    startDate: new Date(),
    endDate: new Date(new Date().getTime() + 3600000) 
  });

  const handleCommitChanges = async ({ added, changed, deleted }) => {
    try {
      if (added && added.length > 0) {
        await handleAddAppointment(added[0]);
      }
      if (changed) {
      }
      if (deleted) {
      }
    } catch (e) {
      console.error('Błąd przy edytowaniu spotkań: ', e);
    }
  };

  return (
    <Scheduler data={schedulerData} onAppointmentAdd={handleAddAppointment}>
      <EditingState onCommitChanges={handleCommitChanges} />
      <WeekView />
      <Appointments />
      <AppointmentForm />
    </Scheduler>
  );
}

export default App;