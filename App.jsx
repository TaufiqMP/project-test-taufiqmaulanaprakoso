import { useEffect } from 'react';
import logoSuit from './assets/images/logo-suit.png';

function App() {
  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const url = 'https://suitmedia-backend.suitdev.com/api/ideas?page[number]=1&page[size]=1&append[]=small_image&append[]=medium_image&sort=-published_at';

        const response = await fetch(url, {
          headers: {
            Accept: 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('API RESPONSE:', data);

        // Log detail agar jelas:
        if (data.data && data.data.length > 0) {
          console.log('First item:', data.data[0]);
          console.log('small_image:', data.data[0].small_image);
          console.log('medium_image:', data.data[0].medium_image);
        }

      } catch (error) {
        console.error('Error fetching ideas:', error);
      }
    };

    fetchIdeas();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <header className="flex bg-[#f56a0a] h-[70px] sticky top-0 w-full z-50">
        <div className="flex-1 flex items-center justify-center">
          <img src={logoSuit} alt="Suitmedia Logo" className="h-[70px] w-auto" />
        </div>
        <nav className="flex-2 flex justify-center gap-6 items-center font-montserrat text-white font-semibold">
          <a href="#">Work</a>
          <a href="#">About</a>
          <a href="#">Services</a>
          <a href="#">Careers</a>
          <a href="#">Contact</a>
        </nav>
      </header>

      <main className="mt-20 text-center">
        <h1 className="text-2xl font-bold">Check Console</h1>
        <p>Open your browser DevTools Console to see the API response.</p>
      </main>
    </div>
  );
}

export default App;
