import React from 'react'
import Particles from 'react-particles-js'
import particleConfig from './particles-config'

export default function ParticleBackground() {
    return (
        <Particles params={particleConfig}/>
    );
}