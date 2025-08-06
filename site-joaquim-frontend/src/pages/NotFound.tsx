
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-medium mb-6">Página não encontrada</h2>
      <p className="text-kickit-gray-medium mb-8 max-w-md mx-auto">
        A página que você está procurando não existe ou foi removida.
      </p>
      <Link to="/" className="btn-primary">
        Voltar para a Home
      </Link>
    </div>
  );
};

export default NotFound;
