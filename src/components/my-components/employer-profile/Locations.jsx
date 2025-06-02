import { useState, useRef, useEffect, useCallback } from "react";
import { IconEdit } from "@/components/my-components/icon/IconEdit";
import { IconAdd } from "@/components/my-components/icon/IconAdd";
import { IconDelete } from "@/components/my-components/icon/IconDelete";
import { IconLocation } from "@/components/my-components/icon/IconLocation";
import { ButtonSuccess } from "@/components/my-components/button/ButtonSuccess";
import { ButtonDestructive } from "@/components/my-components/button/ButtonDestructive";
import { updateLocations } from "@/pages/employer/company-profile/services/updateLocations";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import {
  showErrorToastHasTitle,
  showSuccessToastHasTitle,
} from "@/components/my-components/MyToast";
// Fix cho vấn đề biểu tượng của Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// cập nhật view của bản đồ
function ChangeView({ center }) {
  const map = useMap();
  map.setView(center, 15);
  return null;
}

//  xử lý sự kiện click trên bản đồ
function LocationMarker({ onLocationSelected, selectMode }) {
  useMapEvents({
    click(e) {
      if (selectMode) {
        const { lat, lng } = e.latlng;
        onLocationSelected(lat, lng);
      }
    },
  });
  return null;
}

export const Locations = ({ locations, isCanEdit }) => {
  const locationsDataDefault = useRef(
    locations.map((item) => ({
      ...item,
      id: item.id || crypto.randomUUID(),
    }))
  );
  const [locationsData, setLocationsData] = useState(
    locationsDataDefault.current
  );

  const [isEnableEdit, setIsEnableEdit] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [mapKey, setMapKey] = useState(0);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [selectMode, setSelectMode] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newLocation, setNewLocation] = useState({
    id: "",
    placeName: "",
    address: "",
    latitude: 10.762622,
    longitude: 106.660172,
  });

  // Thiết lập location mặc định khi component được render
  useEffect(() => {
    if (locationsData.length > 0 && !selectedLocation) {
      setSelectedLocation(locationsData[0]);
    }
  }, []);

  // Reset newLocation khi isAddingNew thay đổi
  useEffect(() => {
    if (!isAddingNew) {
      setNewLocation({
        id: "",
        placeName: "",
        address: "",
        latitude: 10.762622,
        longitude: 106.660172,
      });
    }
  }, [isAddingNew]);

  const handleEnbleEdit = () => {
    setIsEnableEdit(true);
    setSearchInput("");
    setError(null);
  };

  const handleHuy = () => {
    setIsEnableEdit(false);
    setIsAddingNew(false);
    setSelectMode(false);
    setLocationsData(locationsDataDefault.current);
    setSearchInput("");
    setError(null);

    if (locationsDataDefault.current.length > 0) {
      setSelectedLocation(locationsDataDefault.current[0]);
    } else {
      setSelectedLocation(null);
    }

    setMapKey((prevKey) => prevKey + 1);
  };

  const handleLuu = () => {
    if (locationsData.some((loc) => !loc.placeName || !loc.address)) {
      setError("Có địa điểm chưa được nhập đầy đủ thông tin");
      return;
    }

    if (locationsData.length === 0) {
      showErrorToastHasTitle(
        "Thất bại",
        "Phải có ít nhất một địa điểm",
        "top-center"
      );
      return;
    }
    setIsEnableEdit(false);
    setIsAddingNew(false);
    setSelectMode(false);
    setSearchInput("");
    setError(null);
    updateLocations(
      locationsData,
      () => {
        showSuccessToastHasTitle(
          "Thành công",
          "Cập nhật thông tin chung",
          "top-center"
        );
        setLocationsData(locationsData);
        setSelectedLocation(locationsData.length > 0 ? locationsData[0] : null);
        setMapKey((prevKey) => prevKey + 1);
        locationsDataDefault.current = locationsData;
      },
      (fail) => {
        showErrorToastHasTitle(
          "Thất bại",
          "Đã xảy ra lỗi khi cập nhật địa điểm",
          "top-center"
        );
        setLocationsData(locationsDataDefault.current);
        setSelectedLocation(locationsData.length > 0 ? locationsData[0] : null);
        setMapKey((prevKey) => prevKey + 1);
        console.error("fail luu:", fail);
      },
      (exception) => {
        showErrorToastHasTitle(
          "Thất bại",
          "Đã xảy ra lỗi khi cập nhật địa điểm",
          "top-center"
        );
        setLocationsData(locationsDataDefault.current);
        setSelectedLocation(locationsData.length > 0 ? locationsData[0] : null);
        setMapKey((prevKey) => prevKey + 1);
      }
    );
  };

  const handleSelectLocation = (item) => (e) => {
    if (e && e.stopPropagation) {
      e.stopPropagation();
    }

    if (isAddingNew && newLocation.placeName.trim() !== "") {
      handleSaveNewLocation();
    }
    setSelectedLocation(item);
    setIsAddingNew(false);
    setMapKey((prevKey) => prevKey + 1);
  };

  const handleAddNew = () => {
    if (isAddingNew && newLocation.placeName.trim() !== "") {
      if (
        !confirm("Bạn chưa lưu địa điểm mới. Tiếp tục tạo địa điểm mới khác?")
      ) {
        return;
      }
    }

    const newLocationData = {
      id: crypto.randomUUID(),
      placeName: "",
      address: "Nhập địa chỉ hoặc chọn trên bản đồ",
      latitude: 10.762622,
      longitude: 106.660172,
    };

    setNewLocation(newLocationData);
    setIsAddingNew(true);
    setSelectedLocation(null);
    setSearchInput("");
    setError(null);
    setMapKey((prevKey) => prevKey + 1);
  };

  const handleSaveNewLocation = () => {
    if (newLocation.placeName.trim() === "") {
      setError("Vui lòng nhập tên địa điểm");
      return;
    }

    // Kiểm tra địa điểm trùng tên
    const isDuplicate = locationsData.some(
      (loc) =>
        loc.placeName.toLowerCase() === newLocation.placeName.toLowerCase() &&
        loc.id !== newLocation.id
    );

    if (isDuplicate) {
      setError("Tên địa điểm đã tồn tại. Vui lòng chọn tên khác.");
      return;
    }

    // Thêm vị trí mới
    const updatedLocations = [
      ...locationsData,
      {
        ...newLocation,
        placeName: newLocation.placeName.trim(),
      },
    ];

    setLocationsData(updatedLocations);
    setSelectedLocation(newLocation);
    setIsAddingNew(false);
    setSelectMode(false);
    setError(null);
  };

  // Hàm cập nhật vị trí hiện tại (khi không phải thêm mới)
  const handleUpdateCurrentLocation = () => {
    if (!selectedLocation) return;

    const updatedLocations = locationsData.map((item) =>
      item.id === selectedLocation.id ? selectedLocation : item
    );

    setLocationsData(updatedLocations);
    setSelectMode(false);
    setError(null);
  };

  const handleLocationSelected = useCallback(
    async (lat, lng) => {
      if (!selectMode) return;

      setLoading(true);
      setError(null);

      try {
        // Reverse geocoding để lấy thông tin địa chỉ từ tọa độ
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
        );

        const data = await response.json();

        if (isAddingNew) {
          if (data && data.display_name) {
            setNewLocation({
              ...newLocation,
              latitude: lat,
              longitude: lng,
              address: data.display_name,
              placeName:
                newLocation.placeName ||
                data.name ||
                data.address?.road ||
                "Vị trí đã chọn",
            });
          } else {
            setNewLocation({
              ...newLocation,
              latitude: lat,
              longitude: lng,
              address: "Không có thông tin địa chỉ",
            });
          }
        } else if (selectedLocation) {
          if (data && data.display_name) {
            setSelectedLocation({
              ...selectedLocation,
              latitude: lat,
              longitude: lng,
              address: data.display_name,
            });
          } else {
            setSelectedLocation({
              ...selectedLocation,
              latitude: lat,
              longitude: lng,
              address: "Không có thông tin địa chỉ",
            });
          }
        }
      } catch (err) {
        setError("Đã xảy ra lỗi khi lấy thông tin địa chỉ.");
        console.error("Reverse geocoding error:", err);
      } finally {
        setLoading(false);
        setMapKey((prev) => prev + 1);
      }
    },
    [selectMode, isAddingNew, newLocation, selectedLocation]
  );

  // Hàm tìm kiếm địa điểm
  const searchLocation = async (e) => {
    e.preventDefault();

    if (!searchInput.trim()) {
      setError("Vui lòng nhập địa điểm cần tìm");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchInput
        )}`
      );

      const data = await response.json();

      if (data && data.length > 0) {
        const result = data[0];

        if (isAddingNew) {
          setNewLocation({
            ...newLocation,
            latitude: parseFloat(result.lat),
            longitude: parseFloat(result.lon),
            address: result.display_name,
            placeName: newLocation.placeName || result.name || searchInput,
          });
        } else if (selectedLocation) {
          setSelectedLocation({
            ...selectedLocation,
            latitude: parseFloat(result.lat),
            longitude: parseFloat(result.lon),
            address: result.display_name,
          });

          // Tự động cập nhật địa điểm trong danh sách
          if (isEnableEdit) {
            const updatedLocations = locationsData.map((item) =>
              item.id === selectedLocation.id
                ? {
                    ...item,
                    latitude: parseFloat(result.lat),
                    longitude: parseFloat(result.lon),
                    address: result.display_name,
                  }
                : item
            );
            setLocationsData(updatedLocations);
          }
        }
        setMapKey((prev) => prev + 1);
      } else {
        setError("Không tìm thấy địa điểm này. Vui lòng thử lại.");
      }
    } catch (err) {
      setError("Đã xảy ra lỗi khi tìm kiếm. Vui lòng thử lại sau.");
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteLocation = (id, e) => {
    // Ngăn chặn sự kiện click lan ra ngoài
    e.stopPropagation();

    const updatedLocations = locationsData.filter((item) => item.id !== id);
    setLocationsData(updatedLocations);

    // Cập nhật selection sau khi xóa
    if (selectedLocation?.id === id) {
      if (updatedLocations.length > 0) {
        setSelectedLocation(updatedLocations[0]);
      } else {
        setSelectedLocation(null);
      }
    }

    setMapKey((prev) => prev + 1);
  };

  // Quyết định địa điểm nào sẽ hiển thị trên bản đồ
  const locationToDisplay = isAddingNew ? newLocation : selectedLocation;

  return (
    <div className="bg-background p-5 rounded-lg">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 justify-center hover:cursor-pointer">
          <h3 className="text-xl font-medium mb-3">Địa điểm</h3>
        </div>
        {isCanEdit && !isEnableEdit && (
          <IconEdit
            onClick={handleEnbleEdit}
            className="cursor-pointer"
          ></IconEdit>
        )}
      </div>

      {/* line */}
      <div className="border border-dashed w-full h-[1px]"></div>

      {/* content */}
      <div className="mt-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            {locationsData.map((item) => (
              <div
                key={item.id}
                className={`border mb-2 p-3 rounded-lg hover:cursor-pointer ${
                  selectedLocation?.id === item.id
                    ? "border-primary bg-primary/5"
                    : "hover:border-primary"
                }`}
                onClick={handleSelectLocation(item)}
              >
                <div className="flex justify-between">
                  <div className="flex-1 mr-2">
                    <h4 className="font-medium">{item.placeName}</h4>
                    <div className="flex items-center gap-2">
                      <IconLocation></IconLocation>
                      <p className="line-clamp-2 text-sm">{item.address}</p>
                    </div>
                  </div>
                  {isEnableEdit && (
                    <IconDelete
                      onClick={(e) => handleDeleteLocation(item.id, e)}
                      className="cursor-pointer flex-shrink-0 text-red-500 hover:text-red-700"
                    ></IconDelete>
                  )}
                </div>
              </div>
            ))}

            {isEnableEdit && (
              <div
                className="border mb-2 p-3 rounded-lg border-dashed border-primary hover:bg-primary/5 hover:cursor-pointer flex items-center justify-center"
                onClick={handleAddNew}
              >
                <IconAdd></IconAdd>
                <span className="ml-2">Thêm địa điểm mới</span>
              </div>
            )}

            {locationsData.length === 0 && !isAddingNew && (
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-500">Chưa có địa điểm nào</p>
                {isEnableEdit && (
                  <button
                    className="mt-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/80"
                    onClick={handleAddNew}
                  >
                    Thêm địa điểm đầu tiên
                  </button>
                )}
              </div>
            )}
          </div>

          {/* map */}
          <div className="md:col-span-2">
            {locationToDisplay ? (
              <>
                {isEnableEdit && (
                  <div className="mb-4">
                    {isAddingNew && (
                      <div className="mb-3">
                        <label className="block text-sm font-medium mb-1">
                          Tên địa điểm <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={newLocation.placeName}
                          onChange={(e) =>
                            setNewLocation({
                              ...newLocation,
                              placeName: e.target.value,
                            })
                          }
                          className="w-full p-2 border rounded-md"
                          placeholder="Nhập tên địa điểm"
                        />
                      </div>
                    )}

                    <form onSubmit={searchLocation} className="flex gap-2 mb-3">
                      <input
                        type="text"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        placeholder="Tìm kiếm địa điểm (ví dụ: Quận 1, TP.HCM)"
                        className="flex-grow p-2 border rounded"
                        disabled={loading || selectMode}
                      />
                      <button
                        type="submit"
                        className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/80"
                        disabled={loading || selectMode}
                      >
                        {loading ? "Đang tìm..." : "Tìm kiếm"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectMode(!selectMode)}
                        className={`px-4 py-2 rounded ${
                          selectMode
                            ? "bg-green-500 text-white hover:bg-green-600"
                            : "bg-gray-200 hover:bg-gray-300"
                        }`}
                        disabled={loading}
                      >
                        {selectMode ? "Đang chọn..." : "Chọn trên bản đồ"}
                      </button>
                    </form>

                    {selectMode && (
                      <p className="text-green-600 mt-2 mb-2">
                        Nhấp vào vị trí bất kỳ trên bản đồ để chọn địa điểm
                      </p>
                    )}

                    {error && <p className="text-red-500 mt-2 mb-2">{error}</p>}

                    <div className="flex justify-end mb-2 gap-2">
                      {isAddingNew ? (
                        <ButtonSuccess
                          content="Lưu địa điểm mới"
                          onClick={handleSaveNewLocation}
                        ></ButtonSuccess>
                      ) : (
                        selectedLocation &&
                        isEnableEdit && (
                          <ButtonSuccess
                            content="Cập nhật vị trí"
                            onClick={handleUpdateCurrentLocation}
                          ></ButtonSuccess>
                        )
                      )}

                      {isAddingNew && (
                        <ButtonDestructive
                          content="Hủy thêm mới"
                          onClick={() => {
                            setIsAddingNew(false);
                            setSelectedLocation(
                              locationsData.length > 0 ? locationsData[0] : null
                            );
                            setMapKey((prev) => prev + 1);
                          }}
                        ></ButtonDestructive>
                      )}
                    </div>
                  </div>
                )}

                <div style={{ height: "400px", width: "100%" }}>
                  <MapContainer
                    key={mapKey}
                    center={[
                      parseFloat(locationToDisplay.latitude) || 10.762622,
                      parseFloat(locationToDisplay.longitude) || 106.660172,
                    ]}
                    zoom={15}
                    style={{
                      height: "100%",
                      width: "100%",
                      borderRadius: "8px",
                    }}
                    className={selectMode ? "cursor-crosshair" : ""}
                  >
                    <ChangeView
                      center={[
                        parseFloat(locationToDisplay.latitude) || 10.762622,
                        parseFloat(locationToDisplay.longitude) || 106.660172,
                      ]}
                    />
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker
                      position={[
                        parseFloat(locationToDisplay.latitude) || 10.762622,
                        parseFloat(locationToDisplay.longitude) || 106.660172,
                      ]}
                    >
                      <Popup>
                        <div>
                          <strong>
                            {locationToDisplay.placeName || "Địa điểm"}
                          </strong>
                          <p>
                            {locationToDisplay.address || "Không có địa chỉ"}
                          </p>
                        </div>
                      </Popup>
                    </Marker>
                    <LocationMarker
                      onLocationSelected={handleLocationSelected}
                      selectMode={selectMode}
                    />
                  </MapContainer>
                </div>
              </>
            ) : (
              <div className="h-[400px] flex flex-col items-center justify-center bg-gray-100 rounded-lg">
                {isAddingNew ? (
                  <div className="text-center p-4">
                    <p className="text-primary font-medium mb-2">
                      Đang thêm địa điểm mới
                    </p>
                    <p className="text-gray-500">
                      Vui lòng nhập tên và tìm kiếm hoặc chọn vị trí trên bản đồ
                    </p>
                  </div>
                ) : (
                  <p className="text-gray-500">Không có địa điểm nào</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* btn */}
      {isEnableEdit && (
        <div className="mt-5 flex justify-end gap-5">
          <ButtonDestructive
            content="Hủy"
            onClick={handleHuy}
          ></ButtonDestructive>
          <ButtonSuccess
            content="Lưu"
            onClick={handleLuu}
            disabled={loading || (isAddingNew && !newLocation.placeName)}
          ></ButtonSuccess>
        </div>
      )}
    </div>
  );
};
