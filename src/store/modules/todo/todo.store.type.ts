// Types
import { TTodo, TTodoFilter } from '../../../types/todo.type'

export type TTodoStore = {
	state: {
		loading: boolean
		list: TTodo[]
		filter: TTodoFilter
	}
}
