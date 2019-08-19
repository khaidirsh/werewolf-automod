import React from 'react';
import './styles/style.css';
import LobbyMaster from './LobbyMaster';
import LobbyPlayer from './LobbyPlayer';

class Lobby extends React.Component {
    render() {
        if (this.props.master) {
            return <LobbyMaster />
        } else {
            return <LobbyPlayer />
        }
        
    }
}

export default Lobby;