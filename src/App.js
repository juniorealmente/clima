import React, { useEffect, useState } from 'react'
import './App.css'

export default function App() {
	useEffect(() => {
		obterClima()
	}, [])

	const [clima, setClima] = useState({})

	async function obterClima() {
		let url = 'https://api.hgbrasil.com/weather?format=json-cors&woeid=455963'
		await fetch(url)
			.then(response => response.json())
			.then(data => {
				// console.log(data.results)
				setClima(data.results)
			})
			.catch(function (error) {
				console.error(`Houve um erro: ${error}`)
			})
	}

	let previsao = []

	// se as informaçoes da api não forem carregadas, não tenta fazer a previsao
	if (clima.forecast) {
		previsao = clima.forecast.map(item => (
			<tr key={item.date}>
				<td>{item.date}</td>
				<td>{item.weekday}</td>
				<td>{item.max}°C</td>
				<td>{item.min}°C</td>
				<td>{item.description}</td>
			</tr>
		))
	}

	return (
		<div>
			<h1>Clima em {clima.city}:</h1>
			<h3>Temperatura: {clima.temp}°C</h3>
			<h3>Descrição: {clima.description}</h3>
			<h3>Umidade do ar: {clima.humidity}%</h3>
			<h3>Velocidade do vento: {clima.wind_speedy}</h3>
			<h1>Previsão da Semana:</h1>
			<table border="2">
				<thead>
					<tr>
						<th>Data</th>
						<th>Dia da Semana</th>
						<th>Máxima</th>
						<th>Mínima</th>
						<th>Descrição</th>
					</tr>
				</thead>
				<tbody>
					{previsao}
				</tbody>
			</table>
		</div>
	)
}