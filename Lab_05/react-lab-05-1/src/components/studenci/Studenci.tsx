import React from 'react';

interface Student {
  imie: string;
  nazwisko: string;
  rocznik: number;
}

const Students: Student[] = [
  { imie: 'Jan', nazwisko: 'Kowalski', rocznik: 2020 },
  { imie: 'Anna', nazwisko: 'Nowak', rocznik: 2019 },
  { imie: 'Piotr', nazwisko: 'Wiśniewski', rocznik: 2021 },
  { imie: 'Maria', nazwisko: 'Wójcik', rocznik: 2022 },
];

const Studenci: React.FC = () => {
  return (
    <table>
      <thead>
        <tr>
          <th>Imię</th>
          <th>Nazwisko</th>
          <th>Rocznik</th>
        </tr>
      </thead>
      <tbody>
        {Students.map((student, index) => (
          <tr key={index}>
            <td>{student.imie}</td>
            <td>{student.nazwisko}</td>
            <td>{student.rocznik}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Studenci;