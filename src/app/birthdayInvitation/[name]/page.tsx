"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSearchParams, usePathname } from "next/navigation";
import { FaWhatsapp } from "react-icons/fa";
import styles from "./styles.module.css";

type InvitationProps = {
	name: string;
	language: string;
};

export default function Component() {
	const [countdown, setCountdown] = useState("");
	const pathname = usePathname();
	const name = pathname.split("/")[2];

	const searchParams = useSearchParams();
	const language = searchParams.get("language") || "pt";
	console.log(language);
	useEffect(() => {
		const targetDate = new Date("2024-09-21T18:00:00");

		const updateCountdown = () => {
			const now = new Date();
			const difference = targetDate.getTime() - now.getTime();

			if (difference > 0) {
				const days = Math.floor(difference / (1000 * 60 * 60 * 24));
				const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
				const minutes = Math.floor((difference / 1000 / 60) % 60);
				const seconds = Math.floor((difference / 1000) % 60);

				setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
			} else {
				setCountdown("You are late!");
			}
		};

		const timer = setInterval(updateCountdown, 1000);
		return () => clearInterval(timer);
	}, []);

	const translations = {
		pt: {
			title: "Aniversário de Lucas ",
			for: "Para: ",
			location: "Local: ",
			date: "Data: ",
			time: "Hora: ",
			countdown: "Contagem regressiva: ",
		},
		es: {
			title: "Cumple de Lucas",
			for: "Para: ",
			location: "Ubicación: ",
			date: "Fecha: ",
			time: "Hora: ",
			countdown: "Cuenta regresiva: ",
		},
	};

	const t = translations[language as keyof typeof translations] || translations;

	return (
		<div className={styles["invitation-container"]}>
			<Card className={styles["invitation-card"]}>
				<CardHeader className={styles["card-header"]}>
					<CardTitle className={styles["card-title"]}>{t.title}</CardTitle>
				</CardHeader>
				<CardContent className={styles["card-content"]}>
					<div className={styles["invitation-for"]}>
						<p>{t.for}</p>
						<p>{name}</p>
					</div>
					<div className={styles["invitation-details"]}>
						<p>
							<span>{t.location}:</span> Zapiola, 1353
						</p>
						<p>
							<span>{t.date}:</span> 21/09/2024
						</p>
						<p>
							<span>{t.time}:</span> 18 horas
						</p>
					</div>
					{/* biome-ignore lint/complexity/useLiteralKeys: <explanation> */}
          <div className={styles["countdown"]}>
						<p>{t.countdown}</p>
						<p>{countdown}</p>
					</div>
					{/* biome-ignore lint/complexity/useLiteralKeys: <explanation> */}
          <a href="https://wa.me/5491135947854?text=👍" className={styles["zap"]}>
						<FaWhatsapp /> Confirmar
					</a>
				</CardContent>
			</Card>
		</div>
	);
}
