import React, { useState } from 'react';

// Interfaz para el estado del formulario
interface PaymentFormData {
  cardNumber: string;
  cardExpiry: string;
  cardCvv: string;
  amount: string;
}

function SnailPayForm (){
  const [formData, setFormData] = useState<PaymentFormData>({
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
    amount: '',
  });

  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [apiSuccess, setApiSuccess] = useState<string | null>(null);

  // Manejador de cambios generales y máscaras de entrada
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    if (id === 'cardNumber') {
      // Solo números, máx 16 dígitos
      const cleanValue = value.replace(/\D/g, '').slice(0, 16);
      setFormData((prev) => ({ ...prev, cardNumber: cleanValue }));
    } else if (id === 'cardExpiry') {
      // Máscara automática para MM/AA
      let cleanValue = value.replace(/\D/g, '');
      if (cleanValue.length > 2) {
        cleanValue = `${cleanValue.slice(0, 2)}/${cleanValue.slice(2, 4)}`;
      }
      setFormData((prev) => ({ ...prev, cardExpiry: cleanValue.slice(0, 5) }));
    } else if (id === 'cardCvv') {
      // Solo números, máx 3 dígitos
      const cleanValue = value.replace(/\D/g, '').slice(0, 3);
      setFormData((prev) => ({ ...prev, cardCvv: cleanValue }));
    } else if (id === 'amount') {
      // Permitir números y un punto decimal
      const cleanValue = value.replace(/[^0-9.]/g, '');
      setFormData((prev) => ({ ...prev, amount: cleanValue }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setApiError(null);
    setApiSuccess(null);

    try {
      // Conexión ficticia/real a tu API de Express
      const response = await fetch('http://localhost:3000/api/v1/charges', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cardNumber: formData.cardNumber,
          cardExpiry: formData.cardExpiry,
          cardCvv: formData.cardCvv,
          amount: parseFloat(formData.amount),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Captura errores 400 (Zod / Inválidos) o 402 (Incorrectos / Fondos o Expirados)
        throw new Error(data.message || data.failure_message || 'Error al procesar el pago');
      }

      setApiSuccess(`¡Pago procesado con éxito! ID: ${data.id}`);
      setFormData({ cardNumber: '', cardExpiry: '', cardCvv: '', amount: '' }); // Limpiar formulario
    } catch (error: any) {
      setApiError(error.message || 'Ocurrió un error inesperado');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-scree">
      <div className="w-full max-w-5xl p-6 bg-slate-800/40 backdrop-blur-md rounded-2xl shadow-xl border border-slate-700">
        
        <div className="flex flex-col items-center justify-center mb-6">
          <h2 className="text-xl font-bold text-white tracking-wide">INGRESA TUS DATOS PARA HACER RECARGA</h2>
        </div>

        {apiError && (
          <div className="p-3 mb-4 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg">
            ⚠️ {apiError}
          </div>
        )}
        {apiSuccess && (
          <div className="p-3 mb-4 text-sm text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
            🎉 {apiSuccess}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="flex flex-col gap-1.5">
            <label htmlFor="cardNumber" className="text-sm font-medium text-slate-300">
              Número de Tarjeta
            </label>
            <div className="relative">
              <input
                type="text"
                id="cardNumber"
                required
                placeholder="4242 4242 4242 4242"
                value={formData.cardNumber}
                onChange={handleInputChange}
                className="w-full pl-4 pr-10 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors tracking-widest"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xl">💳</span>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="cardNumber" className="text-sm font-medium text-slate-300">
              Nombre de propietario
            </label>
            <div className="relative">
              <input
                type="text"
                id="nombreCard"
                required
                placeholder="Juan Dominguez Chaves"
                value={formData.cardNumber}
                onChange={handleInputChange}
                className="w-full pl-4 pr-10 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors tracking-widest"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Fecha Expiración */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="cardExpiry" className="text-sm font-medium text-slate-300">
                Expiración
              </label>
              <input
                type="text"
                id="cardExpiry"
                required
                placeholder="MM/AA"
                value={formData.cardExpiry}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors text-center font-medium"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="cardCvv" className="text-sm font-medium text-slate-300">
                Código CVV
              </label>
              <input
                type="password"
                id="cardCvv"
                required
                placeholder="•••"
                value={formData.cardCvv}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors text-center tracking-widest"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="amount" className="text-sm font-medium text-slate-300">
              Monto a Pagar (USD)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">$</span>
              <input
                type="text"
                id="amount"
                required
                placeholder="0.00"
                value={formData.amount}
                onChange={handleInputChange}
                className="w-full pl-8 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 px-4 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 disabled:cursor-not-allowed text-white font-semibold rounded-xl shadow-lg shadow-indigo-600/20 transition-all duration-200 focus:outline-none"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Procesando Pago...
              </span>
            ) : (
              'Confirmar pago'
            )}
          </button>
        </form>

      </div>
    </div>
  );
}

export default SnailPayForm