export interface ICompany {
  _id: string;
  companyName: string;
  owner: string;
  address: string;
  telephone: number;
  type: string;
  email: string;
  appointmentDuration: number;
  schedule: [
    {
      _id: string;
      weekday: number;
      startTime: string;
      finishTime: string;
    }
  ];
}
