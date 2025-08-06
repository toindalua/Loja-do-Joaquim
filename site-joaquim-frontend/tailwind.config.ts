
import type { Config } from "tailwindcss"; // Importa o tipo Config do Tailwind CSS

export default {
	darkMode: ["class"], // Configura o modo escuro para ser ativado pela classe CSS
	content: [
		"./pages/**/*.{ts,tsx}", // Procura classes Tailwind nos arquivos ts/tsx na pasta pages
		"./components/**/*.{ts,tsx}", // Procura classes Tailwind nos arquivos ts/tsx na pasta components
		"./app/**/*.{ts,tsx}", // Procura classes Tailwind nos arquivos ts/tsx na pasta app
		"./src/**/*.{ts,tsx}", // Procura classes Tailwind em todos os arquivos ts/tsx na pasta src
	],
	prefix: "", // Define um prefixo vazio para as classes do Tailwind
	theme: {
		container: {
			center: true, // Centraliza contêineres automaticamente
			padding: '2rem', // Adiciona padding de 2rem aos contêineres
			screens: {
				'2xl': '1400px' // Define largura máxima para telas extra grandes
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))', // Cor para bordas
				input: 'hsl(var(--input))', // Cor para elementos de entrada
				ring: 'hsl(var(--ring))', // Cor para anéis de foco
				background: 'hsl(var(--background))', // Cor de fundo principal
				foreground: 'hsl(var(--foreground))', // Cor de texto principal
				primary: {
					DEFAULT: 'hsl(var(--primary))', // Cor primária padrão
					foreground: 'hsl(var(--primary-foreground))' // Cor de texto sobre fundos primários
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))', // Cor secundária padrão
					foreground: 'hsl(var(--secondary-foreground))' // Cor de texto sobre fundos secundários
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))', // Cor para ações destrutivas
					foreground: 'hsl(var(--destructive-foreground))' // Cor de texto sobre fundos destrutivos
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))', // Cor para elementos atenuados
					foreground: 'hsl(var(--muted-foreground))' // Cor de texto sobre fundos atenuados
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))', // Cor de destaque
					foreground: 'hsl(var(--accent-foreground))' // Cor de texto sobre fundos de destaque
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))', // Cor para popovers
					foreground: 'hsl(var(--popover-foreground))' // Cor de texto em popovers
				},
				card: {
					DEFAULT: 'hsl(var(--card))', // Cor para cards
					foreground: 'hsl(var(--card-foreground))' // Cor de texto em cards
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))', // Cor de fundo da barra lateral
					foreground: 'hsl(var(--sidebar-foreground))', // Cor de texto da barra lateral
					primary: 'hsl(var(--sidebar-primary))', // Cor primária da barra lateral
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))', // Cor de texto primária da barra lateral
					accent: 'hsl(var(--sidebar-accent))', // Cor de destaque da barra lateral
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))', // Cor de texto de destaque da barra lateral
					border: 'hsl(var(--sidebar-border))', // Cor de borda da barra lateral
					ring: 'hsl(var(--sidebar-ring))' // Cor do anel de foco da barra lateral
				},
				// Cores específicas para a loja
				kickit: {
					orange: '#F97316', // Laranja da marca
					black: '#000000', // Preto da marca
					white: '#FFFFFF', // Branco da marca
					'gray-light': '#F1F1F1', // Cinza claro para fundos
					'gray-medium': '#8A898C', // Cinza médio para textos secundários
					'gray-dark': '#333333', // Cinza escuro para textos principais
				}
			},
			fontFamily: {
				sans: ['Inter', 'sans-serif'], // Fonte principal para texto
				heading: ['Montserrat', 'sans-serif'], // Fonte para títulos
			},
			borderRadius: {
				lg: 'var(--radius)', // Raio de borda grande
				md: 'calc(var(--radius) - 2px)', // Raio de borda médio
				sm: 'calc(var(--radius) - 4px)' // Raio de borda pequeno
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0' // Animação de accordion começando com altura zero
					},
					to: {
						height: 'var(--radix-accordion-content-height)' // Animação de accordion terminando com altura do conteúdo
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)' // Animação inversa começando com altura do conteúdo
					},
					to: {
						height: '0' // Animação inversa terminando com altura zero
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0', // Inicia invisível
						transform: 'translateY(10px)' // Começa 10px abaixo
					},
					'100%': {
						opacity: '1', // Termina totalmente visível
						transform: 'translateY(0)' // Termina na posição normal
					}
				},
				'fade-out': {
					'0%': {
						opacity: '1', // Inicia totalmente visível
						transform: 'translateY(0)' // Começa na posição normal
					},
					'100%': {
						opacity: '0', // Termina invisível
						transform: 'translateY(10px)' // Termina 10px abaixo
					}
				},
				'slide-in': {
					'0%': {
						transform: 'translateX(-100%)' // Começa fora da tela à esquerda
					},
					'100%': {
						transform: 'translateX(0)' // Termina na posição normal
					}
				},
				'slide-out': {
					'0%': {
						transform: 'translateX(0)' // Começa na posição normal
					},
					'100%': {
						transform: 'translateX(100%)' // Termina fora da tela à direita
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out', // Animação para expandir accordion
				'accordion-up': 'accordion-up 0.2s ease-out', // Animação para recolher accordion
				'fade-in': 'fade-in 0.3s ease-out', // Animação para aparecer suavemente
				'fade-out': 'fade-out 0.3s ease-out', // Animação para desaparecer suavemente
				'slide-in': 'slide-in 0.3s ease-out', // Animação para deslizar da esquerda
				'slide-out': 'slide-out 0.3s ease-out' // Animação para deslizar para a direita
			}
		}
	},
	plugins: [require("tailwindcss-animate")], // Adiciona o plugin para animações
} satisfies Config;
