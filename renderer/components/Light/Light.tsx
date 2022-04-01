import { Canvas } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'

export default function Light({ color, on }: { color: string, on: boolean }) {

	return (
		<Canvas style={{ height: 100, width: 100 }} dpr={[1, 1.5]} camera={{ position: [0, 0, 15] }}>
			<pointLight position={[15, 15, 15]} color={!on ? '#ffffff' : color} />

			<mesh {...{ scale: 0.8 }}>
				<sphereBufferGeometry args={[5, 24, 24]} />
				<meshBasicMaterial color={!on ? '#000000' : color} toneMapped={false} />
			</mesh >

			<EffectComposer multisampling={8}>
				<Bloom kernelSize={3} luminanceThreshold={0} luminanceSmoothing={0.3} intensity={0.5} />
				<Bloom kernelSize={2} luminanceThreshold={0} luminanceSmoothing={0} intensity={0.4} />
			</EffectComposer>
		</Canvas>
	)
}