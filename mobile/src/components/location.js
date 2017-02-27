import {makeServerCall, generateRequestBody} from '../shared/utils';
import {updateLocationState} from '../state/actions/location';

const mapStateToProps = (state) => ({
	location: state.location,
});

const mapDispatchToProps = (dispatch) => ({
	updateLocationState: (newState) => {
		dispatch(updateLocationState(newState));
	}
});

function sendToServer(requestBody){
  //TODO: Change to location, not hotkeys.
  makeServerCall('hotkeys', requestBody)
  .then((data) => this.props.updateLocationState(data))
  .catch((err) => this.handleError(err));
}
