import React, { useState } from 'react';
import { Copy, CheckCheck, Filter } from 'lucide-react';

type MessageType = 'célula' | 'Arena' | 'Culto da Família' | 'all';

interface Message {
  text: string;
  type: MessageType;
}

const messages: Message[] = [
  {
    text: "Oi {nome}, senti sua falta na célula! Espero te ver no próximo, hein? Vai ser top!",
    type: "célula"
  },
  {
    text: "E aí, {nome}! Sentimos sua falta no Arena hoje. No próximo você não pode perder, certo? Vai ser uma bênção!",
    type: "Arena"
  },
  {
    text: "Fala, {nome}! A célula não foi a mesma sem você hoje. Bora colar no próximo? Faz falta demais!",
    type: "célula"
  },
  {
    text: "Oi {nome}, senti sua falta na célula hoje! No próximo você vem, né? Vai ser incrível!",
    type: "célula"
  },
  {
    text: "Ei, {nome}! Hoje não foi a mesma coisa sem você. Já marca aí o próximo, porque queremos muito te ver!",
    type: "Culto da Família"
  },
  {
    text: "{nome}, sentimos sua falta hoje! Deus tem algo especial pra você, então não perde o próximo, viu?",
    type: "Culto da Família"
  },
  {
    text: "E aí, {nome}! Não te vi na célula hoje, mas já tô esperando você no próximo. Vai ser bênção!",
    type: "célula"
  },
  {
    text: "{nome}, tá tudo bem? Não te vi hoje na célula e senti sua falta! Espero te ver no próximo!",
    type: "célula"
  },
  {
    text: "{nome}, hoje no Arena foi incrível, mas teria sido ainda melhor com você lá, você vem no próximo né?",
    type: "Arena"
  },
  {
    "text": "Oi {nome}! 😊 Senti sua falta na célula! No próximo você vem, né? Vai ser top! 🙌🔥",
    "type": "célula"
  },
  {
    "text": "E aí, {nome}! 👋 Sentimos sua falta no Arena hoje. No próximo você não pode perder, certo? 🙏✨ Vai ser uma bênção!",
    "type": "Arena"
  },
  {
    "text": "Fala, {nome}! 👀 A célula não foi a mesma sem você hoje. Bora colar no próximo? 🎉 Faz falta demais!",
    "type": "célula"
  },
  {
    "text": "Oi {nome} 👋 Senti sua falta na célula hoje! No próximo você vem, né? Vai ser incrível! 🔥",
    "type": "célula"
  },
  {
    "text": "Ei, {nome}! 💙 Hoje não foi a mesma coisa sem você na célula. Já marca aí o próximo, porque queremos muito te ver! 📅✨",
    "type": "célula"
  },
  {
    "text": "Oi {nome}! 😊 Sentimos sua falta no Culto da Família! No próximo você vem, né? Vai ser um tempo precioso juntos! 🙌💙",
    "type": "Culto da Família"
  },
  {
    "text": "E aí, {nome}! 👋 O Culto da Família foi uma bênção, mas faltou você lá! No próximo esperamos por você e sua família! 🙏✨",
    "type": "Culto da Família"
  },
  {
    "text": "Fala, {nome}! Hoje tivemos um Culto da Família incrível, mas sentimos sua falta! 🙌 Já anota aí o próximo pra não perder! 😉",
    "type": "Culto da Família"
  },
  {
    "text": "Oi {nome} 👋 Ontem foi o Culto da Família e sentimos sua falta! No próximo você não pode perder! 💙🔥",
    "type": "Culto da Família"
  },
  {
    "text": "Ei, {nome}! 💛 O Culto da Família foi especial, mas teria sido ainda melhor com você! Esperamos você e sua família no próximo! 🙏✨",
    "type": "Culto da Família"
  }
];

function App() {
  const [name, setName] = useState('');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [selectedType, setSelectedType] = useState<MessageType>('all');

  const handleCopy = async (message: string, index: number) => {
    const finalMessage = message.replace(/{nome}/g, name || '[nome]');
    await navigator.clipboard.writeText(finalMessage);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const filteredMessages = selectedType === 'all' 
    ? messages 
    : messages.filter(message => message.type === selectedType);

  const messageTypes: MessageType[] = ['all', 'célula', 'Arena', 'Culto da Família'];

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

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Filter className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Filtrar por tipo</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {messageTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedType === type
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type === 'all' ? 'Todos' : type}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {filteredMessages.map((message, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-4 flex items-start justify-between gap-4"
            >
              <div className="flex-1">
                <p className="text-gray-700">
                  {message.text.replace(/{nome}/g, name || '[nome]')}
                </p>
                <span className="inline-block mt-2 text-sm font-medium text-blue-500 bg-blue-50 px-2 py-1 rounded">
                  {message.type}
                </span>
              </div>
              <button
                onClick={() => handleCopy(message.text, index)}
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

        {filteredMessages.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            Nenhuma mensagem encontrada para este tipo de evento.
          </div>
        )}
      </div>
    </div>
  );
}

export default App;