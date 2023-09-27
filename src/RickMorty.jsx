import React, { useState, useEffect } from 'react';

export const RickAndMortyCharacters = () => {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://rickandmortyapi.com/api/character')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al cargar los personajes.');
        }
        return response.json();
      })
      .then((data) => {
        setCharacters(data.results);
        setIsLoading(false); // Marcamos la carga como completa
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false); // Marcamos la carga como completa incluso en caso de error
      });
  }, []);

  const openModal = (character) => {
    setSelectedCharacter(character);
  };

  const closeModal = () => {
    setSelectedCharacter(null);
  };

  return (
    <div>
      <h1>Personajes de Rick and Morty</h1>
      {isLoading ? (
        <p>Cargando...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div className="character-list">
          {characters.map((character) => (
            <div
              key={character.id}
              className="character-card"
              onClick={() => openModal(character)}
            >
              <h2>{character.name}</h2>
              <img src={character.image} alt={character.name} />
              <p>Location: {character.location.name}</p>
              {character.first_seen && <p>First Seen: {character.first_seen}</p>}
              {character.type && <p>Tipo: {character.type}</p>}
              <p>Estado: {character.status}</p>
            </div>
          ))}
        </div>
      )}

      {selectedCharacter && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>{selectedCharacter.name}</h2>
            <img src={selectedCharacter.image} alt={selectedCharacter.name} />
            <p>Location: {selectedCharacter.location.name}</p>
            {selectedCharacter.first_seen && (
              <p>First Seen: {selectedCharacter.first_seen}</p>
            )}
            {selectedCharacter.type && <p>Tipo: {selectedCharacter.type}</p>}
            <p>Estado: {selectedCharacter.status}</p>
          </div>
        </div>
      )}
    </div>
  );
};

