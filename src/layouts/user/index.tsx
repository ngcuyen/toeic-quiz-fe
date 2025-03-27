import Footer from './Footer';
import Header from './Header';
import TopHeader from './TopHeader';

const UserLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
      <div>
        <TopHeader />
        <Header />
        {children}
        <Footer />
      </div>
    );
  };

export default UserLayout;
