import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAddress } from "../../services/apiGeocoding";
import { useDispatch } from "react-redux";
function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}


export const fetchAddress = createAsyncThunk(
  "user/fetchAddress",
  async function (_, { rejectWithValue }) {
    try {
      const positionObj = await getPosition();
      const position = {
        latitude: positionObj.coords.latitude,
        longitude: positionObj.coords.longitude,
      };
  
      const addressObj = await getAddress(position);
      // console.log(addressObj)
      const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;
      
      return { position, address };
    } catch (error) {
      console.error('Error fetching position:', error);
      return rejectWithValue('Failed to fetch location');
    }
  }
);




const initialState = {
  username: "",
  status: "idle",
  position: null,
  address: '',
  error: ''
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateName(state, action) {
      state.username = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchAddress.pending, (state) => {
        console.log("fetchAddress.pending");
        state.status = "loading";
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        console.log("fetchAddress.fulfilled", action.payload);
        state.position = action.payload.position;
        state.status = "idle";
        state.address = action.payload.address;
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        console.log("fetchAddress.rejected", action.error.message);
        state.status = "error";
        state.error = action.error.message;
      }),
});


export const { updateName } = userSlice.actions;
export default userSlice.reducer;
