import React, { useState } from 'react';
import { Copy, CheckCheck } from 'lucide-react';

const messages = [
  "Oi {nome}, senti sua falta na célula! Espero te ver no próximo, hein? Vai ser top!",
  "E aí, {nome}! Sentimos sua falta no Arena hoje. No próximo você não pode perder, certo? Vai ser uma bênção!",
  "Fala, {nome}! A célula não foi a mesma sem você hoje. Bora colar no próximo? Faz falta demais!",
  "Oi {nome}, senti sua falta na célula hoje! No próximo você vem, né? Vai ser incrível!",
  "Ei, {nome}! Hoje não foi a mesma coisa sem você. Já marca aí o próximo, porque queremos muito te ver!",
  "{nome}, sentimos sua falta hoje! Deus tem algo especial pra você, então não perde o próximo, viu?",
  "E aí, {nome}! Não te vi na célula hoje, mas já tô esperando você no próximo. Vai ser bênção!",
  "{nome}, tá tudo bem? Não te vi hoje na célula e senti sua falta! Espero te ver no próximo!",
  "{nome}, hoje foi incrível, mas teria sido ainda melhor com você lá! No próximo você vem, né?"
];

function App() {
  const [name, setName] = useState('');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = async (message: string, index: number) => {
    const finalMessage = message.replace(/{nome}/g, name || '[nome]');
    await navigator.clipboard.writeText(finalMessage);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Gerador de Mensagens
        </h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Nome da pessoa
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Digite o nome aqui"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />
        </div>

        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-4 flex items-start justify-between gap-4"
            >
              <p className="text-gray-700 flex-1">
                {message.replace(/{nome}/g, name || '[nome]')}
              </p>
              <button
                onClick={() => handleCopy(message, index)}
                className="flex-shrink-0 text-gray-500 hover:text-blue-600 transition"
                title="Copiar mensagem"
              >
                {copiedIndex === index ? (
                  <CheckCheck className="w-5 h-5 text-green-500" />
                ) : (
                  <Copy className="w-5 h-5" />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;