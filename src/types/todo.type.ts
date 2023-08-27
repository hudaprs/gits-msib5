export type TTodo = {
	id: number
	title: string
	completed: boolean
}

export type TTodoForm = {
	title: string
}

export type TTodoFilter = 'all' | 'active' | 'completed'
