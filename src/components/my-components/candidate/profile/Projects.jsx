import { IconEdit } from "@/components/my-components/icon/IconEdit";
import { IconDelete } from "@/components/my-components/icon/IconDelete";
import { IconAdd } from "@/components/my-components/icon/IconAdd";
import { ButtonSuccess } from "@/components/my-components/button/ButtonSuccess";
import { ButtonDestructive } from "@/components/my-components/button/ButtonDestructive";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FaLink } from "react-icons/fa6";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MyCalendar } from "@/components/my-components/MyCalendar";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useState, useEffect, useRef } from "react";
import {
  showErrorToastHasTitle,
  showSuccessToastHasTitle,
} from "@/components/my-components/MyToast";
import { addOrUpdateProject } from "@/pages/candidate/profile/services/addOrUpdateProject";
import { deleteProject } from "@/pages/candidate/profile/services/deleteProject";
import { getSocialMedias } from "@/shared-services/system-value/getSocialMedias";
import { SocialMediaLinks } from "../../icon/SocialMediaLinks";

export const Projects = ({ projects = [], isCanEdit = false }) => {
  const socialMediaSystem = useRef([]);
  const [isEnableEdit, setIsEnableEdit] = useState(false);
  const [projectsData, setProjectsData] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    isOnGoing: false,
    startDate: null,
    endDate: null,
    description: "",
    socialMediaLinks: [],
  });

  const [newSocialMedia, setNewSocialMedia] = useState("");
  const [newSocialMediaLink, setNewSocialMediaLink] = useState("");

  const defaultProjectsData = useRef([]);

  useEffect(() => {
    getSocialMedias(
      (data) => {
        const socialMediaWithIds = data.map((name) => ({
          id: crypto.randomUUID(),
          name: name,
        }));
        socialMediaSystem.current = socialMediaWithIds;
      },
      () => {
        showErrorToastHasTitle("Lỗi", "Không thể tải dữ liệu mạng xã hội");
      },
      () => {
        showErrorToastHasTitle(
          "Lỗi",
          "Có lỗi xảy ra khi tải dữ liệu mạng xã hội"
        );
      }
    );
  }, []);

  useEffect(() => {
    if (projects && projects.length > 0) {
      const processedProjects = projects.map((project) => ({
        ...project,
        startDate: project.startDate ? new Date(project.startDate) : null,
        endDate: project.endDate ? new Date(project.endDate) : null,
        socialMediaLinks: (project.socialMediaLinks || []).map((item) => ({
          ...item,
          id: crypto.randomUUID(),
        })),
      }));
      setProjectsData(processedProjects);
      defaultProjectsData.current = [...processedProjects];
    }
  }, [projects]);

  const resetForm = () => {
    setFormData({
      name: "",
      isOnGoing: false,
      startDate: null,
      endDate: null,
      description: "",
      socialMediaLinks: [],
    });
    setNewSocialMedia("");
    setNewSocialMediaLink("");
  };

  const handleEnableEdit = () => {
    setIsEnableEdit(true);
  };

  const handleCancel = () => {
    setIsEnableEdit(false);
    setIsAddingNew(false);
    setEditingProject(null);
    setProjectsData([...defaultProjectsData.current]);
    resetForm();
  };

  const handleAddNew = () => {
    setIsAddingNew(true);
    setEditingProject(null);
    resetForm();
  };

  const handleEdit = (project) => {
    setEditingProject(project.id);
    setIsAddingNew(false);
    setFormData({
      name: project.name || "",
      isOnGoing: project.isOnGoing || false,
      startDate: project.startDate,
      endDate: project.endDate,
      description: project.description || "",
      socialMediaLinks: [...(project.socialMediaLinks || [])],
    });
  };

  const handleAddSocialMedia = () => {
    if (!newSocialMedia || !newSocialMediaLink) {
      showErrorToastHasTitle(
        "Lỗi",
        "Vui lòng chọn mạng xã hội và nhập liên kết"
      );
      return;
    }

    const newLink = {
      id: crypto.randomUUID(),
      name: newSocialMedia,
      link: newSocialMediaLink,
    };

    setFormData((prev) => ({
      ...prev,
      socialMediaLinks: [...prev.socialMediaLinks, newLink],
    }));
    setNewSocialMedia("");
    setNewSocialMediaLink("");
  };

  const handleRemoveSocialMedia = (id) => {
    setFormData((prev) => ({
      ...prev,
      socialMediaLinks: prev.socialMediaLinks.filter((item) => item.id !== id),
    }));
  };

  const handleUpdateSocialMediaLink = (id, newLink) => {
    setFormData((prev) => ({
      ...prev,
      socialMediaLinks: prev.socialMediaLinks.map((sm) =>
        sm.id === id ? { ...sm, link: newLink } : sm
      ),
    }));
  };

  const handleSaveProject = () => {
    if (!formData.name.trim()) {
      showErrorToastHasTitle("Lỗi", "Tên dự án không được để trống");
      return;
    }

    if (formData.name.trim().length > 500) {
      showErrorToastHasTitle("Lỗi", "Tên dự án không được vượt quá 500 ký tự");
      return;
    }

    if (!formData.startDate) {
      showErrorToastHasTitle("Lỗi", "Vui lòng chọn ngày bắt đầu");
      return;
    }

    if (formData.startDate && formData.startDate > new Date()) {
      showErrorToastHasTitle(
        "Lỗi",
        "Ngày bắt đầu không thể là ngày trong tương lai"
      );
      return;
    }

    if (!formData.isOnGoing) {
      if (!formData.endDate) {
        showErrorToastHasTitle(
          "Lỗi",
          "Vui lòng chọn ngày kết thúc hoặc đánh dấu dự án đang diễn ra"
        );
        return;
      }
      if (formData.endDate <= formData.startDate) {
        showErrorToastHasTitle("Lỗi", "Ngày kết thúc phải sau ngày bắt đầu");
        return;
      }
    }

    if (formData.description.trim().length > 5000) {
      showErrorToastHasTitle("Lỗi", "Mô tả không được vượt quá 5000 ký tự");
      return;
    }

    const projectData = {
      projectId: editingProject,
      name: formData.name.trim(),
      isOnGoing: formData.isOnGoing,
      startDate: formData.startDate,
      endDate: formData.isOnGoing ? null : formData.endDate,
      description: formData.description.trim(),
      socialMediaLinks: formData.socialMediaLinks.map(
        ({ id, ...rest }) => rest
      ),
    };

    addOrUpdateProject(
      projectData,
      (response) => {
        const newProject = {
          id: response.id,
          name: formData.name.trim(),
          isOnGoing: formData.isOnGoing,
          startDate: formData.startDate,
          endDate: formData.isOnGoing ? null : formData.endDate,
          description: formData.description.trim(),
          socialMediaLinks: [...formData.socialMediaLinks],
        };

        let updatedProjects;
        if (editingProject) {
          updatedProjects = projectsData.map((project) =>
            project.id === editingProject ? newProject : project
          );
        } else {
          updatedProjects = [...projectsData, newProject];
        }

        setProjectsData(updatedProjects);
        defaultProjectsData.current = [...updatedProjects];

        showSuccessToastHasTitle(
          "Thành công",
          editingProject ? "Cập nhật dự án thành công" : "Thêm dự án thành công"
        );
        handleCancel();

        setIsAddingNew(false);
        setEditingProject(null);
        resetForm();
      },
      (error) => {
        console.log("Save error:", error);
        showErrorToastHasTitle(
          "Lỗi",
          error?.message || "Có lỗi xảy ra khi lưu thông tin dự án"
        );
      },
      (exception) => {
        console.error("Exception in handleSaveProject:", exception);
        showErrorToastHasTitle("Lỗi", "Đã xảy ra lỗi không mong muốn");
      }
    );
  };

  const handleDeleteProject = (projectId) => {
    deleteProject(
      projectId,
      () => {
        const updatedProjects = projectsData.filter(
          (project) => project.id !== projectId
        );
        setProjectsData(updatedProjects);
        defaultProjectsData.current = [...updatedProjects];

        showSuccessToastHasTitle("Thành công", "Xóa dự án thành công");
        handleCancel();
      },
      (error) => {
        if (error && error.message) {
          showErrorToastHasTitle("Lỗi", error.message);
        } else {
          showErrorToastHasTitle(
            "Lỗi",
            "Có lỗi xảy ra khi xóa thông tin dự án"
          );
        }
      },
      (exception) => {
        console.error("Exception in handleDeleteProject:", exception);
        showErrorToastHasTitle("Lỗi", "Đã xảy ra lỗi không mong muốn");
      }
    );
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const renderProjectForm = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Tên dự án *</label>
          <Input
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            placeholder="Nhập tên dự án"
          />
        </div>
        <div className="flex items-center space-x-2 pt-6">
          <input
            type="checkbox"
            id="ongoing"
            checked={formData.isOnGoing}
            onChange={(e) => handleInputChange("isOnGoing", e.target.checked)}
            className="rounded"
          />
          <label htmlFor="ongoing" className="text-sm">
            Dự án đang diễn ra
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Ngày bắt đầu *
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <button
                className={cn(
                  "w-full flex items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none"
                )}
              >
                {formData.startDate
                  ? format(formData.startDate, "dd/MM/yyyy")
                  : "Chọn ngày bắt đầu"}
                <CalendarIcon className="ml-2 h-4 w-4 opacity-50" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <MyCalendar
                mode="single"
                selected={formData.startDate}
                onSelect={(date) => handleInputChange("startDate", date)}
                disabled={(date) => date > new Date()}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        {!formData.isOnGoing && (
          <div>
            <label className="block text-sm font-medium mb-1">
              Ngày kết thúc
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  className={cn(
                    "w-full flex items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none"
                  )}
                >
                  {formData.endDate
                    ? format(formData.endDate, "dd/MM/yyyy")
                    : "Chọn ngày kết thúc"}
                  <CalendarIcon className="ml-2 h-4 w-4 opacity-50" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <MyCalendar
                  mode="single"
                  selected={formData.endDate}
                  onSelect={(date) => handleInputChange("endDate", date)}
                  disabled={(date) =>
                    date > new Date() ||
                    (formData.startDate && date <= formData.startDate)
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Mô tả</label>
        <Textarea
          value={formData.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          placeholder="Mô tả chi tiết về dự án..."
          rows={4}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Liên kết mạng xã hội
        </label>
        <div className="space-y-2">
          {formData.socialMediaLinks.map((item) => (
            <div key={item.id} className="flex items-center gap-2">
              <span className="min-w-[100px]">{item.name}:</span>
              <Input
                value={item.link}
                onChange={(e) =>
                  handleUpdateSocialMediaLink(item.id, e.target.value)
                }
                className="flex-1"
              />
              <button
                type="button"
                onClick={() => handleRemoveSocialMedia(item.id)}
                className="text-destructive hover:text-destructive/80"
              >
                <IconDelete />
              </button>
            </div>
          ))}

          <div className="flex items-center gap-2 mt-2">
            <select
              value={newSocialMedia}
              onChange={(e) => setNewSocialMedia(e.target.value)}
              className="w-[140px] rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none"
            >
              <option value="" disabled>
                Chọn mạng xã hội
              </option>
              {socialMediaSystem.current.map((sm) => (
                <option key={sm.id} value={sm.name}>
                  {sm.name}
                </option>
              ))}
            </select>
            <Input
              placeholder="Nhập liên kết"
              value={newSocialMediaLink}
              onChange={(e) => setNewSocialMediaLink(e.target.value)}
              className="flex-1"
            />
            <button
              type="button"
              className="border rounded-md p-2 hover:bg-accent/10 transition-colors"
              onClick={handleAddSocialMedia}
            >
              <IconAdd />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-card p-5 rounded-lg">
      <div className="flex justify-between">
        <div className="flex items-center gap-2 mb-3">
          <h3 className="text-xl font-medium">Dự án</h3>
          <div>
            {!isAddingNew && !editingProject && isEnableEdit && (
              <IconAdd onClick={handleAddNew} className="size-8" />
            )}
          </div>
        </div>
        {isCanEdit && !isEnableEdit && <IconEdit onClick={handleEnableEdit} />}
      </div>

      <div className="border border-dashed w-full h-[1px]"></div>

      <div className="mt-5">
        {projectsData.length === 0 && !isAddingNew ? (
          <p>Chưa có thông tin</p>
        ) : (
          <div className="space-y-4">
            {projectsData.map((project) => (
              <div key={project.id} className="border rounded-lg p-4">
                {editingProject === project.id ? (
                  <div>
                    {renderProjectForm()}
                    <div className="flex gap-2 justify-end mt-4">
                      <ButtonDestructive
                        content="Hủy"
                        onClick={() => {
                          setEditingProject(null);
                          resetForm();
                        }}
                      />
                      <ButtonSuccess
                        content="Lưu"
                        onClick={handleSaveProject}
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex justify-between items-start">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                        <div className="flex gap-2 items-center">
                          <label className="text-foreground/70 text-sm">
                            Tên dự án:
                          </label>
                          <p className="text-foreground font-medium">
                            {project.name}
                          </p>
                        </div>
                        <div className="flex gap-2 items-center">
                          <label className="text-foreground/70 text-sm">
                            Trạng thái:
                          </label>
                          <p className="text-foreground">
                            {project.isOnGoing
                              ? "Đang diễn ra"
                              : "Đã hoàn thành"}
                          </p>
                        </div>
                        {project.startDate && (
                          <div className="flex gap-2 items-center">
                            <label className="text-foreground/70 text-sm">
                              Ngày bắt đầu:
                            </label>
                            <p className="text-foreground">
                              {format(project.startDate, "dd/MM/yyyy")}
                            </p>
                          </div>
                        )}
                        {project.endDate && (
                          <div className="flex gap-2 items-center">
                            <label className="text-foreground/70 text-sm">
                              Ngày kết thúc:
                            </label>
                            <p className="text-foreground">
                              {format(project.endDate, "dd/MM/yyyy")}
                            </p>
                          </div>
                        )}
                        {project.description && (
                          <div className="md:col-span-2">
                            <label className="text-foreground/70 text-sm block mb-1">
                              Mô tả:
                            </label>
                            <p className="text-foreground whitespace-pre-wrap break-words min-w-0 flex-1">
                              {project.description}
                            </p>
                          </div>
                        )}
                        {project.socialMediaLinks &&
                          project.socialMediaLinks.length > 0 && (
                            <div className="flex gap-3 items-center">
                              <label className="text-foreground/70 text-sm block mb-1">
                                Liên kết:
                              </label>
                              <SocialMediaLinks
                                items={project.socialMediaLinks.map((sm) => ({
                                  name: sm.name,
                                  url: sm.link,
                                }))}
                                className="flex gap-2"
                                classNameItem="text-foreground/70 hover:text-primary transition-colors text-lg"
                              />
                            </div>
                          )}
                      </div>

                      {isEnableEdit && (
                        <div className="flex gap-2 ml-4">
                          <IconEdit onClick={() => handleEdit(project)} />
                          <IconDelete
                            onClick={() => handleDeleteProject(project.id)}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {isAddingNew && (
              <div className="border rounded-lg p-4 border-dashed">
                <h4 className="font-medium mb-4">Thêm dự án mới</h4>
                {renderProjectForm()}
                <div className="flex gap-2 justify-end mt-4">
                  <ButtonDestructive
                    content="Hủy"
                    onClick={() => {
                      setIsAddingNew(false);
                      resetForm();
                    }}
                  />
                  <ButtonSuccess content="Lưu" onClick={handleSaveProject} />
                </div>
              </div>
            )}
          </div>
        )}

        {isEnableEdit && (
          <div className="mt-5 flex justify-between">
            <div className="flex gap-2">
              <ButtonDestructive content="Thoát" onClick={handleCancel} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
