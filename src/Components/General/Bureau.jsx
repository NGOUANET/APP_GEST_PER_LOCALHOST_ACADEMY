import Hearder from './Hearder';
import SideBar from './SideBar';
  
  function Bureau() {
    return (
      <div className="flex mb-8">
        <SideBar />
        <div className="flex-1">
          <Hearder />
          <main className="p-4">
            <h2 className="text-2xl">Bienvenue sur le tableau de bord</h2>
          
          </main>
        </div>
      </div>
    );
  }
  
  export default Bureau;
  
  