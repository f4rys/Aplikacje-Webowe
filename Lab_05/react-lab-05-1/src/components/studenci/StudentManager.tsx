import React, { useState } from 'react';

interface Student {
  imie: string;
  nazwisko: string;
  rocznik: number;
}

const initialStudents: Student[] = [
  { imie: 'Jan', nazwisko: 'Kowalski', rocznik: 2020 },
  { imie: 'Anna', nazwisko: 'Nowak', rocznik: 2019 },
  { imie: 'Piotr', nazwisko: 'Wiśniewski', rocznik: 2021 },
  { imie: 'Maria', nazwisko: 'Wójcik', rocznik: 2022 },
];

const Dodawanie: React.FC<{ onAddStudent: (student: Student) => void }> = ({ onAddStudent }) => {
  const [imie, setImie] = useState('');
  const [nazwisko, setNazwisko] = useState('');
  const [rocznik, setRocznik] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const rocznikNumber = parseInt(rocznik, 10);
    if (imie && nazwisko && !isNaN(rocznikNumber)) {
      onAddStudent({ imie, nazwisko, rocznik: rocznikNumber });
      setImie('');
      setNazwisko('');
      setRocznik('');
    } else {
      alert('Please fill in all fields correctly.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Imię:</label>
        <input type="text" value={imie} onChange={(e) => setImie(e.target.value)} required />
      </div>
      <div>
        <label>Nazwisko:</label>
        <input type="text" value={nazwisko} onChange={(e) => setNazwisko(e.target.value)} required />
      </div>
      <div>
        <label>Rocznik:</label>
        <input type="text" value={rocznik} onChange={(e) => setRocznik(e.target.value)} required />
      </div>
      <button type="submit">Dodaj</button>
    </form>
  );
};

const StudentManager: React.FC = () => {
  const [students, setStudents] = useState<Student[]>(initialStudents);

  const addStudent = (student: Student) => {
    setStudents([...students, student]);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Imię</th>
            <th>Nazwisko</th>
            <th>Rocznik</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td>{student.imie}</td>
              <td>{student.nazwisko}</td>
              <td>{student.rocznik}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Dodawanie onAddStudent={addStudent} />
    </div>
  );
};

export default StudentManager;