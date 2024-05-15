"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";

// Initialisiere Prisma Client zur Interaktion mit der Datenbank
const prisma = new PrismaClient();

//get a single blog from the database by id
export const fetchSingleBlog = async (id: string) => {
  const blogs = await prisma.blog.findFirst({
    where: {
      id: id,
    },
  });
  return blogs;
};

//get a single discussion from the database by id
export const fetchSingleDiscussion = async (id: string) => {
  const discussions = await prisma.discussion.findFirst({
    where: {
      id: id,
    },
  });
  return discussions;
};

//get a single foto from the database by id
export const fetchSingleFoto = async (id: string) => {
  const fotos = await prisma.foto.findFirst({
    where: {
      id: id,
    },
  });
  return fotos;
};

//add a new blog to the database using the form data
export const addBlog = async (formData: {
  imageUrl: string;
  category: string;
  title: string;
  description: string;
}) => {
  const { imageUrl, category, title, description } = formData;

  // Get session information from user
  const session: any = await getServerSession(authOptions);

  // Only logged in users can add a blog
  if (session) {
    // Push the information to the database
    const newBlog = await prisma.blog.create({
      data: {
        imageUrl: imageUrl || null,
        category: category,
        title: title,
        description: description,
        authorId: session?.user?.id,
      },
    });

    // revalidate the path and redirect to the blogs page
    revalidatePath("/blogs/add-blog");
    redirect("/blogs");
  }
};

//update a blog in the database using the form data
export const updateBlog = async (
  id: any,
  formData: {
    imageUrl: string;
    category: string;
    title: string;
    description: string;
  }
) => {
  const { imageUrl, category, title, description } = formData;
  //get session information from user
  const session: any = await getServerSession(authOptions);

  // push the information to the database
  const updated_blog = await prisma.blog.update({
    where: {
      id: id,
    },
    data: {
      imageUrl: imageUrl ? imageUrl : null,
      category: category,
      title: title,
      description: description,
      authorId: session?.user?.id,
    },
  });

  revalidatePath(`/blogs/update-blog/${id}`);
  redirect("/blogs");
};
//add a new comment to an entry
export const addCommentToBlog = async (blogId: string, formData: any) => {
  // collect information from the form using formData
  const text = formData.get("text");

  //get session information from user
  const session: any = await getServerSession(authOptions);

  // push the information to the database
  const added_comment = await prisma.comment.create({
    data: {
      authorId: session?.user?.id,
      blogId: blogId,
      text: text,
    },
  });
  // revalidate the path of the current blog
  revalidatePath(`/blogs/${blogId}`);
};
//fetch all commentsn from a id
export const fetchComments = async (blogId: string) => {
  const blogs = await prisma.comment.findMany({
    where: {
      blogId: blogId,
    },
    include: { author: true },
    orderBy: { createdAt: "desc" },
    take: 3,
  });
  return blogs;
};
//delte Comment by Id and BlogId
export const deleteComment = async (commentId: string, blogId: string) => {
  //get session information from user
  const session: any = await getServerSession(authOptions);
  const commentData: any = await prisma.comment.findFirst({
    where: {
      id: commentId,
    },
  });
  // Only the author of the comment can delete it
  if (session?.user?.id === commentData.authorId) {
    const blogs = await prisma.comment.delete({
      where: {
        id: commentId,
      },
    });
    //revalidate the path of the current blog
    revalidatePath(`/blogs/${blogId}`);
  }
};
//fetch all Users from Database
export const fetchUsers = async () => {
  // const skip = (page - 1) * pageSize;
  const users = await prisma.user.findMany({
    take: 5,
  });
  return users;
};
//assign a permission to a user
export const assignPermission = async (userId: any, formData: any) => {
  const permission_name: any = formData.get("permission_name");

  //get session information from user
  const session: any = await getServerSession(authOptions);

  if (session?.user?.role === "ADMIN") {
    // push the information to the database
    const asigned_user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        permissions: {
          push: permission_name,
        },
      },
    });
    //revalidate the admin dashboard
    revalidatePath("/admin/dashboard");
    redirect("/admin/dashboard");
  }
};
//get UserId from User Session
export const getUserId = async () => {
  //get session information from user
  const session: any = await getServerSession(authOptions);
  //store the user id in loggedInUserId
  const loggedInUserId: any = session?.user?.id;
  return loggedInUserId;
};
//add a new discussion to the database using the form data
export const addDiscussion = async (formData: {
  title: string;
  category: string;
  description: string;
}) => {
  const { title, category, description } = formData;

  // Get session information from user
  const session: any = await getServerSession(authOptions);

  // Only logged in users can add a blog
  if (session) {
    // Push the information to the database
    const newBlog = await prisma.discussion.create({
      data: {
        category: category,
        description: description,
        title: title,
        authorId: session?.user?.id,
      },
    });
  }

  revalidatePath("/blogs/add-discussion");
  redirect("/forum");
};
//upate a discussion in the database using the form data
export const updateDiscussion = async (
  id: string,
  formData: {
    category: string;
    title: string;
    description: string;
  }
) => {
  const { category, description, title } = formData;
  //get session information from user
  const session: any = await getServerSession(authOptions);

  // push the information to the database
  const updated_discussion = await prisma.discussion.update({
    where: {
      id: id,
    },
    data: {
      category: category,
      title: title,
      description: description,
      authorId: session?.user?.id,
    },
  });
  //revalidate the path and redirect to the forum page
  revalidatePath(`/forum/update-discussion/${id}`);
  redirect("/forum");
};
//get user information from the database
export const getUserFromPrisma = async () => {
  //get session information from user
  const session: any = await getServerSession(authOptions);
  const loggedInUserId: any = session?.user?.id;
  //get user information from the database
  const user = await prisma.user.findFirst({
    where: {
      id: loggedInUserId,
    },
  });
  return user;
};

//update user information in the database
export const updateUser = async (
  id: string,
  formData: {
    userImage: string;
    username: string;
    password: string;
    email: string;
  }
) => {
  const { userImage, username, password, email } = formData;

  // get current user information from the database
  const user = await prisma.user.findUnique({ where: { id } });

  // prepare the updates object
  const updates: any = {};

  if (password) {
    updates.password = await bcrypt.hash(password, 10);
  }

  if (username && username !== user?.username) {
    // check if the new username already exists
    const usernameExists = await prisma.user.count({
      where: { username: username },
    });
    if (usernameExists) throw new Error("Benutzername existiert bereits");
    updates.username = username;
  }

  if (email && user && email !== user.email) {
    // check if the new email already exists
    const emailExists = await prisma.user.count({
      where: { email: email },
    });
    if (emailExists) throw new Error("Email existiert bereits");
    updates.email = email;
  }

  if (userImage && userImage !== user?.userImage) {
    updates.userImage = userImage;
  }

  // update the user information in the database if there are any updates
  if (Object.keys(updates).length > 0) {
    await prisma.user.update({
      where: { id },
      data: updates,
    });
  }

  // revalidate the path and redirect to the user profile
  revalidatePath(`/profil/update-user/${id}`);
  redirect(`/profil/${id}`);
};

// add a new foto to the database using the form data
export const addFoto = async (formData: {
  imageUrl: string;
  category: string;
  description: string;
}) => {
  const { imageUrl, category, description } = formData;

  // Get session information from user
  const session: any = await getServerSession(authOptions);

  // Only logged in users can add a blog
  if (session) {
    // Push the information to the database
    const newBlog = await prisma.foto.create({
      data: {
        imageUrl: imageUrl,
        category: category,
        description: description,
        authorId: session?.user?.id,
      },
    });
    //revalidate the path and redirect to the fotos page
    revalidatePath("/fotos/add-foto");
    redirect("/fotos");
  }
};

//update a foto in the database using the form data
export const updateFoto = async (
  id: any,
  formData: {
    imageUrl: string;
    category: string;
    description: string;
  }
) => {
  const { imageUrl, category, description } = formData;
  //get session information from user
  const session: any = await getServerSession(authOptions);
  if (session) {
    // push the information to the database
    const updated_blog = await prisma.foto.update({
      where: {
        id: id,
      },
      data: {
        imageUrl: imageUrl,
        category: category,
        description: description,
        authorId: session?.user?.id,
      },
    });
  }

  revalidatePath(`/fotos/update-foto/${id}`);
  redirect("/fotos");
};
//delte Comment by Id and BlogId
export const deleteBlog = async (blogId: string) => {
  try {
    // delete all comments that belong to the blog first
    await prisma.comment.deleteMany({
      where: {
        blogId: blogId,
      },
    });

    // delete the blog itself
    await prisma.blog.delete({
      where: {
        id: blogId,
      },
    });

    // revalidate the path and redirect to the blogs page
    revalidatePath(`/blogs`);
    redirect(`/blogs`);
  } catch (error) {
    console.error(
      "Fehler beim Löschen des Blogs und seiner Kommentare:",
      error
    );
  }
};
export const deleteDiscussion = async (discussionId: string) => {
  try {
    // delete all comments that belong to the discussion first
    await prisma.comment.deleteMany({
      where: {
        discussionId: discussionId,
      },
    });

    // delete the discussion itself
    await prisma.discussion.delete({
      where: {
        id: discussionId,
      },
    });

    // revalidate the path and redirect to the forum page
    revalidatePath(`/forum`);
    redirect(`/forum`);
  } catch (error) {
    console.error(
      "Fehler beim Löschen der Diskussion und ihrer Kommentare:",
      error
    );
  }
};
export const deleteFoto = async (fotoId: string) => {
  // delete all comments that belong to the foto first
  await prisma.comment.deleteMany({
    where: {
      fotoId: fotoId,
    },
  });

  // delete the foto itself
  await prisma.foto.delete({
    where: {
      id: fotoId,
    },
  });

  // revalidate the path and redirect to the fotos page
  revalidatePath(`/fotos`);
  redirect(`/fotos`);
};
