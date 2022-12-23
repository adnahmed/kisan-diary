import { ReactNode } from "react"
import CommonCostTableHeader from "./CommonCostTableHeader"
import GlowyButton from "./GlowyButton"

export interface TableHeadProps {
  children: ReactNode[]
}
export default function TableHead(props: TableHeadProps) {
  const pagePreview = () => {
    window.print()
  }
  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <GlowyButton style={{ padding: '3px', width: 'max-content' }}>
          <button onClick={pagePreview} style={{ color: 'blue' }}>
            Page Preview
          </button>
        </GlowyButton>
        <CommonCostTableHeader />
      </div>
      {props.children}
    </div>
  )
}
