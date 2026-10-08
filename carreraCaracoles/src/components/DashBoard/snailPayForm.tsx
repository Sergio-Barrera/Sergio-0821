import React, { useState } from 'react';
import {createPayment} from '../../services/SnailPay'
import type { PaymentFormData, PaySnileRequest, TransactionResponse } from '../../types/typePayment'
import type { LoggedInUser } from '../../types/auth'
import Swal from 'sweetalert2';

type SnailPayProps = {
    user: LoggedInUser,
    onPayStatus: (data: TransactionResponse) => void;
};

function SnailPayForm ({user, onPayStatus}:SnailPayProps){
  const [formData, setFormData] = useState<PaymentFormData>({
    cardNumber: '',
    nameUser: '',
    cardExpiry: '',
    cardCvv: '',
    amount: '',
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {id, value} = e.target;

    if (id === 'cardNumber') {
      const cleanValue = value.replace(/\D/g, '').slice(0, 16);
      setFormData((prev) => ({ ...prev, cardNumber: cleanValue }));
    }else if (id === 'nameUser') {
      let cleanValue = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ ]/g, '');
      setFormData((prev) => ({ ...prev, nameUser: cleanValue.slice(0, 100) }));
    }else if (id === 'cardExpiry') {
      let cleanValue = value.replace(/\D/g, '');
      if (cleanValue.length >= 1) {
        const firstDigit = parseInt(cleanValue[0], 10);
        if (firstDigit > 1) {
          cleanValue = `0${firstDigit}`;
        }
      }
      if (cleanValue.length >= 2) {
        const month = parseInt(cleanValue.slice(0, 2), 10);
        if (month > 12) {
          cleanValue = `12${cleanValue.slice(2)}`;
        }
      }
      if (cleanValue.length > 2) {
        cleanValue = `${cleanValue.slice(0, 2)}/${cleanValue.slice(2, 4)}`;
      }
      setFormData((prev) => ({ ...prev, cardExpiry: cleanValue.slice(0, 5) }));
    } else if (id === 'cardCvv') {
      const cleanValue = value.replace(/\D/g, '').slice(0, 3);
      setFormData((prev) => ({ ...prev, cardCvv: cleanValue }));
    } else if (id === 'amount') {
      const cleanValue = value.replace(/[^0-9.]/g, '');
      setFormData((prev) => ({ ...prev, amount: cleanValue }));
    }
  };

  const handlePayment= async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await Swal.fire({
      title: "¿Confirmar transacción?",
      text: "¿Estás seguro de que deseas realizar esta transacción?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, confirmar",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
    });

    if(!result.isConfirmed){
      return;
    }

    const userData = { idUser: user.id, email:user.email }
    const payment: PaySnileRequest = {
      idUser: userData.idUser,
      email: userData.email,
      amount: Number(formData.amount),
      card: {
        number: formData.cardNumber,
        expiredCard: formData.cardExpiry,
        cvv: formData.cardCvv,
        NameUserCar: formData.nameUser,
      }
    }

    try{
      const resultPay = await createPayment(payment);
      console.log(resultPay)
      await Swal.fire(
         `Saldo cargado $${resultPay.data.transaction_amount}`,
          resultPay.message,
          "success",
      );

      onPayStatus(resultPay.data);

    }catch(error){
      if (error instanceof Error) {
        Swal.fire(
          "ERROR Transacción",
          error.message,
          "warning",
        );
      }
    }finally{
      setLoading(false);
    }
  }
  
  return (
    <div className="flex items-center justify-center min-h-scree">
      <div className="w-full max-w-5xl p-6 bg-[#5A3825]/40 backdrop-blur-md rounded-2xl shadow-xl border border-slate-700">
        
        <div className="flex flex-col items-center justify-center mb-6">
          <h2 className="text-xl font-bold text-white tracking-wide">INGRESA TUS DATOS PARA HACER RECARGA</h2>
        </div>

        <form onSubmit={handlePayment} className="space-y-4">
          
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
            <label htmlFor="nameUser" className="text-sm font-medium text-slate-300">
              Nombre de propietario
            </label>
            <div className="relative">
              <input
                type="text"
                id="nameUser"
                required
                minLength={3}
                maxLength={100}
                placeholder="Juan Dominguez Chaves"
                value={formData.nameUser}
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