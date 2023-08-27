// Types
import { TTodoFilter } from '../../../types/todo.type'

export type TFilterProps = {
	filter: TTodoFilter
	todoListLength: number
}

export type TFilterEmits = {
	(e: 'change', filter: TTodoFilter): void
	(e: 'clear-completed'): void
}
