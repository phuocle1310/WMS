from rest_framework.permissions import IsAuthenticated, IsAdminUser


class CreateUserPermission(IsAuthenticated):
    def has_permission(self, request, view):
        return super().has_permission(request, view) \
               and request.user.has_perm(['wms.add_user', ])


class ChangeUserPermission(IsAdminUser):
    def has_permission(self, request, view):
        return super().has_permission(request, view) and request.user.has_perm(['wms.change_user'])


class DeleteUserPermission(IsAdminUser):
    def has_permission(self, request, view):
        return super().has_permission(request, view) and request.user.has_perm(['wms.delete_user'])


class ViewUserInfoPermission(IsAdminUser):
    def has_permission(self, request, view):
        return super().has_permission(request, view) and request.user.has_perm(['wms.view_user'])