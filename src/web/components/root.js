import GlobalState from '../global-state'
import InfoTable from './info-table'
import SelectionModal from './selection-modal'

const wait = (msec => new Promise(y => setTimeout(y, msec)))

export default class Root extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            notification: '',
            selectionModal: false,
            tableInfo: {},
        }

        GlobalState.initialize(this)
    }


    componentDidMount() {
        this.fetchInfo()
    }


    fetchInfo() {
        fetch('/info')
            .then(res => res.json())
            .then(json => {
                GlobalState.set('tableInfo', json)
            })
    }


    render() {
        return (
        <div>
            {this.state.selectionModal ? <SelectionModal /> : ''}
            <pre>{this.state.notification}</pre>
            <InfoTable info={this.state.tableInfo} fetchInfo={::this.fetchInfo} />
            <div className="nice-button"><a onClick={::this.reload}>Reload App</a></div>
        </div>
        )
    }



    reload() {

        GlobalState.set('notification', 'Now Reloading...')

        fetch('/reload')
            .then(res => res.text())
            .then(text => {
                return wait(1500)
            })
            .then(x => {
                GlobalState.set('notification', '')
            })
    }
}
