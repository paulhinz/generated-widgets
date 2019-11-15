import React from 'react';
import { fireEvent, render, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { apiConferencePost } from 'api/conferences';
import ConferenceAddFormContainer from 'components/ConferenceAddFormContainer';
import 'i18n/__mocks__/i18nMock';
import conferenceMock from 'components/__mocks__/conferenceMocks';

jest.mock('api/conferences');
jest.mock('@material-ui/pickers', () => ({
  ...jest.requireActual('@material-ui/pickers'),
  // eslint-disable-next-line react/prop-types
  DateTimePicker: ({ id, value, name, label, onChange }) => {
    const handleChange = event => onChange(event.currentTarget.value);
    return (
      <span>
        <label htmlFor={id}>{label}</label>
        <input id={id} name={name} value={value || ''} onChange={handleChange} />
      </span>
    );
  },
}));

jest.mock('auth/KeycloakContext', () => {
  const withKeycloak = Component => {
    return props => (
      <Component
        {...props} // eslint-disable-line react/jsx-props-no-spreading
        keycloak={{
          initialized: true,
          authenticated: true,
        }}
      />
    );
  };

  return { withKeycloak };
});

describe('ConferenceAddFormContainer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const errorMessageKey = 'errors.dataLoading';
  const successMessageKey = 'common.dataSaved';

  const onErrorMock = jest.fn();
  const onCreateMock = jest.fn();

  it('saves data', async () => {
    apiConferencePost.mockImplementation(data => Promise.resolve(data));

    const { findByTestId, findByLabelText, queryByText, rerender } = render(
      <ConferenceAddFormContainer onError={onErrorMock} onUpdate={onCreateMock} />
    );

    const nameField = await findByLabelText('entities.conference.name');
    fireEvent.change(nameField, { target: { value: conferenceMock.name } });

    const summaryField = await findByLabelText('entities.conference.summary');
    fireEvent.change(summaryField, { target: { value: conferenceMock.summary } });

    const startField = await findByLabelText('entities.conference.start');
    fireEvent.change(startField, { target: { value: conferenceMock.start } });

    const endField = await findByLabelText('entities.conference.end');
    fireEvent.change(endField, { target: { value: conferenceMock.end } });

    const conferencePriceField = await findByLabelText('entities.conference.conferencePrice');
    fireEvent.change(conferencePriceField, { target: { value: conferenceMock.conferencePrice } });

    const conferenceIdField = await findByLabelText('entities.conference.conferenceId');
    fireEvent.change(conferenceIdField, { target: { value: conferenceMock.conferenceId } });

    const registrationField = await findByLabelText('entities.conference.registration');
    fireEvent.change(registrationField, { target: { value: conferenceMock.registration } });

    const attendeeCountField = await findByLabelText('entities.conference.attendeeCount');
    fireEvent.change(attendeeCountField, { target: { value: conferenceMock.attendeeCount } });

    const venueNameField = await findByLabelText('entities.conference.venueName');
    fireEvent.change(venueNameField, { target: { value: conferenceMock.venueName } });

    const venueLatField = await findByLabelText('entities.conference.venueLat');
    fireEvent.change(venueLatField, { target: { value: conferenceMock.venueLat } });

    const venueLongField = await findByLabelText('entities.conference.venueLong');
    fireEvent.change(venueLongField, { target: { value: conferenceMock.venueLong } });

    const venueIdField = await findByLabelText('entities.conference.venueId');
    fireEvent.change(venueIdField, { target: { value: conferenceMock.venueId } });

    const saleStartDateField = await findByLabelText('entities.conference.saleStartDate');
    fireEvent.change(saleStartDateField, { target: { value: conferenceMock.saleStartDate } });

    const earlyBirdActiveField = await findByLabelText('entities.conference.earlyBirdActive');
    fireEvent.change(earlyBirdActiveField, { target: { value: conferenceMock.earlyBirdActive } });

    const regionField = await findByLabelText('entities.conference.region');
    fireEvent.change(regionField, { target: { value: conferenceMock.region } });

    const signatureField = await findByLabelText('entities.conference.signature');
    fireEvent.change(signatureField, { target: { value: conferenceMock.signature } });

    rerender(<ConferenceAddFormContainer onError={onErrorMock} onUpdate={onCreateMock} />);

    const saveButton = await findByTestId('submit-btn');

    fireEvent.click(saveButton);

    await wait(() => {
      expect(apiConferencePost).toHaveBeenCalledTimes(1);
      expect(apiConferencePost).toHaveBeenCalledWith(conferenceMock);

      expect(queryByText(successMessageKey)).toBeInTheDocument();

      expect(onErrorMock).toHaveBeenCalledTimes(0);
      expect(queryByText(errorMessageKey)).not.toBeInTheDocument();
    });
  }, 7000);

  it('shows an error if data is not successfully saved', async () => {
    apiConferencePost.mockImplementation(() => Promise.reject());

    const { findByTestId, findByLabelText, queryByText, rerender } = render(
      <ConferenceAddFormContainer onError={onErrorMock} onUpdate={onCreateMock} />
    );

    const nameField = await findByLabelText('entities.conference.name');
    fireEvent.change(nameField, { target: { value: conferenceMock.name } });

    const summaryField = await findByLabelText('entities.conference.summary');
    fireEvent.change(summaryField, { target: { value: conferenceMock.summary } });

    const startField = await findByLabelText('entities.conference.start');
    fireEvent.change(startField, { target: { value: conferenceMock.start } });

    const endField = await findByLabelText('entities.conference.end');
    fireEvent.change(endField, { target: { value: conferenceMock.end } });

    const conferencePriceField = await findByLabelText('entities.conference.conferencePrice');
    fireEvent.change(conferencePriceField, { target: { value: conferenceMock.conferencePrice } });

    const conferenceIdField = await findByLabelText('entities.conference.conferenceId');
    fireEvent.change(conferenceIdField, { target: { value: conferenceMock.conferenceId } });

    const registrationField = await findByLabelText('entities.conference.registration');
    fireEvent.change(registrationField, { target: { value: conferenceMock.registration } });

    const attendeeCountField = await findByLabelText('entities.conference.attendeeCount');
    fireEvent.change(attendeeCountField, { target: { value: conferenceMock.attendeeCount } });

    const venueNameField = await findByLabelText('entities.conference.venueName');
    fireEvent.change(venueNameField, { target: { value: conferenceMock.venueName } });

    const venueLatField = await findByLabelText('entities.conference.venueLat');
    fireEvent.change(venueLatField, { target: { value: conferenceMock.venueLat } });

    const venueLongField = await findByLabelText('entities.conference.venueLong');
    fireEvent.change(venueLongField, { target: { value: conferenceMock.venueLong } });

    const venueIdField = await findByLabelText('entities.conference.venueId');
    fireEvent.change(venueIdField, { target: { value: conferenceMock.venueId } });

    const saleStartDateField = await findByLabelText('entities.conference.saleStartDate');
    fireEvent.change(saleStartDateField, { target: { value: conferenceMock.saleStartDate } });

    const earlyBirdActiveField = await findByLabelText('entities.conference.earlyBirdActive');
    fireEvent.change(earlyBirdActiveField, { target: { value: conferenceMock.earlyBirdActive } });

    const regionField = await findByLabelText('entities.conference.region');
    fireEvent.change(regionField, { target: { value: conferenceMock.region } });

    const signatureField = await findByLabelText('entities.conference.signature');
    fireEvent.change(signatureField, { target: { value: conferenceMock.signature } });

    rerender(<ConferenceAddFormContainer onError={onErrorMock} onUpdate={onCreateMock} />);

    const saveButton = await findByTestId('submit-btn');

    fireEvent.click(saveButton);

    await wait(() => {
      expect(apiConferencePost).toHaveBeenCalledTimes(1);
      expect(apiConferencePost).toHaveBeenCalledWith(conferenceMock);

      expect(queryByText(successMessageKey)).not.toBeInTheDocument();

      expect(onErrorMock).toHaveBeenCalledTimes(1);
      expect(queryByText(errorMessageKey)).toBeInTheDocument();
    });
  }, 7000);
});