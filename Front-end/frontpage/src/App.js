import React from 'react';
import NavBar from './NavBar';
import Header from './Header';
import AboutUs from './AboutUs';
import QAndA from './QAndA';
import Contact from './Contact';
import Footer from './Footer';

export class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render() {
    return (
      <>
        <NavBar />
        <Header />
        <AboutUs />
        <QAndA />
        <Contact />
        <Footer />
      </>
    )
  }
}

export default App;

