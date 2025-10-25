import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { projectService } from '../services/projectService';
import { ProjectCard } from '../components/ProjectCard';
import { Loader } from '../components/Loader';
import { toast } from 'react-toastify';

const projectSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(100, 'Title must be less than 100 characters'),
  description: z.string().max(500, 'Description must be less than 500 characters').optional(),
});

type ProjectFormData = z.infer<typeof projectSchema>;

export const Dashboard = () => {
  const [showForm, setShowForm] = useState(false);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
  });

  const { data: projects, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: projectService.getProjects,
  });

  const createMutation = useMutation({
    mutationFn: projectService.createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Project created successfully!');
      reset();
      setShowForm(false);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Failed to create project');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: projectService.deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Project deleted successfully!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Failed to delete project');
    },
  });

  const onSubmit = (data: ProjectFormData) => {
    createMutation.mutate(data);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 drop-shadow-md">My Projects</h1>
            <p className="mt-2 text-gray-700 text-lg">Manage your projects and tasks</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn-primary"
          >
            {showForm ? (
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Cancel
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                New Project
              </span>
            )}
          </button>
        </div>

        {showForm && (
          <div className="card mb-8 animate-in slide-in-from-top duration-300">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Create New Project
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                  Project Title *
                </label>
                <input
                  {...register('title')}
                  type="text"
                  id="title"
                  className="input-field"
                  placeholder="Enter project title"
                />
                {errors.title && (
                  <p className="mt-2 text-sm text-red-600 font-medium">{errors.title.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  {...register('description')}
                  id="description"
                  rows={3}
                  className="input-field resize-none"
                  placeholder="Enter project description (optional)"
                />
                {errors.description && (
                  <p className="mt-2 text-sm text-red-600 font-medium">{errors.description.message}</p>
                )}
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={createMutation.isPending}
                >
                  {createMutation.isPending ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Create Project
                    </span>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {projects && projects.length === 0 ? (
          <div className="glass-card text-center py-16">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-primary-500/30 rounded-full">
                <svg
                  className="h-16 w-16 text-primary-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No projects yet</h3>
            <p className="text-lg text-gray-700 mb-6">Get started by creating your first project</p>
            <button onClick={() => setShowForm(true)} className="btn-primary">
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create Your First Project
              </span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects?.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onDelete={(id) => deleteMutation.mutate(id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
