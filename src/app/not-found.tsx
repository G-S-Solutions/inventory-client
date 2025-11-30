import Image from 'next/image';
import Link from 'next/link';
import NotfoundImage from '@/assets/images/technical-diff-dog.jpg'

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="text-center space-y-6">
        <Image 
          src={NotfoundImage} 
          alt="Página no encontrada" 
          width={800} 
          height={800}
        />
        {/* <img 
          src={NotfoundImage.src} 
          alt="Página no encontrada" 
          className="w-96 h-auto mx-auto"
        /> */}
        <h1 className="text-4xl font-bold text-gray-900">Página no encontrada</h1>
        <p className="text-gray-600">Lo sentimos, la página que buscas no existe.</p>
        <Link 
          href="/" 
          className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;