// Types
import { TTodoFilter } from '../../../types/todo.type'

export type TFilterProps = {
	filter: TTodoFilter
}

export type TFilterEmits = {
	(e: 'change', filter: TTodoFilter): void
}
