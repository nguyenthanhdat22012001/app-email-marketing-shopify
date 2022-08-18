<template>
  <div>
    <div
      v-if="editor"
      class="h-[45px] flex items-center text-xs border border-[#EBEBF0] bg-[#F7F7F9] rounded-t"
    >
      <div class="inline-block relative z-0 px-[9px]">
        <div
          class="absolute z-1 w-[1px] h-4 top-[50%] translate-y-[-50%] right-0 bg-[#E5E8EF]"
        ></div>
        <v-select-editor v-model="select_heading" class="font-bold">
          <option :value="0">Paragraph</option>
          <option
            v-for="n in 6"
            :key="n"
            :value="n"
            :class="{ 'is-active': editor.isActive('heading', { level: n }) }"
          >
            Heading {{ n }}
          </option>
        </v-select-editor>
      </div>
      <div class="inline-block relative z-0 px-[9px]">
        <div
          class="absolute z-1 w-[1px] h-4 top-[50%] translate-y-[-50%] right-0 bg-[#E5E8EF]"
        ></div>
        <v-select-editor v-model="select_font_size">
          <option
            v-for="n in Array.from({ length: 56 }, (_, i) => i + 1).slice(10)"
            :key="n"
            :value="n"
            :class="{
              'is-active': editor.isActive('font_size', { size: n }),
            }"
          >
            {{ n }}px
          </option>
        </v-select-editor>
      </div>
      <div class="inline-block relative z-0 px-[9px]">
        <div
          class="absolute z-1 w-[1px] h-4 top-[50%] translate-y-[-50%] right-0 bg-[#E5E8EF]"
        ></div>
        <button
          class="py-[5px] px-[7px] rounded font-medium text-gray-dark"
          @click="editor.chain().focus().toggleBold().run()"
          :class="{ 'is-active': editor.isActive('bold') }"
        >
          <svg
            width="10"
            height="11"
            viewBox="0 0 10 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.80469 5.07812C8.10938 4.72656 8.39062 4.04688 8.4375 3.55469C8.60156 1.77344 7.21875 0.25 5.46094 0.25H0.796875C0.585938 0.25 0.421875 0.4375 0.421875 0.625V1.75C0.421875 1.96094 0.585938 2.125 0.796875 2.125H1.52344V8.875H0.796875C0.585938 8.875 0.421875 9.0625 0.421875 9.25V10.375C0.421875 10.5859 0.585938 10.75 0.796875 10.75H5.69531C7.35938 10.75 8.83594 9.55469 9 7.89062C9.11719 6.76562 8.60156 5.73438 7.80469 5.07812ZM3.39844 2.125H5.46094C6.07031 2.125 6.58594 2.64062 6.58594 3.25C6.58594 3.88281 6.07031 4.375 5.46094 4.375H3.39844V2.125ZM5.46094 8.875H3.39844V6.25H5.46094C6.1875 6.25 6.77344 6.85938 6.77344 7.5625C6.77344 8.28906 6.1875 8.875 5.46094 8.875Z"
            />
          </svg>
        </button>
        <button
          class="py-[5px] px-[7px] rounded font-medium text-gray-dark"
          @click="editor.chain().focus().toggleItalic().run()"
          :class="{ 'is-active': editor.isActive('italic') }"
        >
          <svg
            width="10"
            height="11"
            viewBox="0 0 10 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.75 0.625C7.75 0.4375 7.5625 0.25 7.375 0.25H2.875C2.66406 0.25 2.5 0.4375 2.5 0.625V1.375C2.5 1.58594 2.66406 1.75 2.875 1.75H3.95312L2.07812 9.25H0.625C0.414062 9.25 0.25 9.4375 0.25 9.625V10.375C0.25 10.5859 0.414062 10.75 0.625 10.75H5.125C5.3125 10.75 5.5 10.5859 5.5 10.375V9.625C5.5 9.4375 5.3125 9.25 5.125 9.25H4.02344L5.89844 1.75H7.375C7.5625 1.75 7.75 1.58594 7.75 1.375V0.625Z"
            />
          </svg>
        </button>
        <button
          class="py-[5px] px-[7px] rounded font-medium text-gray-dark"
          @click="editor.chain().focus().toggleUnderline().run()"
          :class="{ 'is-active': editor.isActive('underline') }"
        >
          <svg
            width="11"
            height="12"
            viewBox="0 0 11 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 2H1.75V5.75C1.75 7.83594 3.41406 9.5 5.5 9.5C7.5625 9.5 9.25 7.83594 9.25 5.75V2H10C10.1875 2 10.375 1.83594 10.375 1.625V0.875C10.375 0.6875 10.1875 0.5 10 0.5H6.625C6.41406 0.5 6.25 0.6875 6.25 0.875V1.625C6.25 1.83594 6.41406 2 6.625 2H7.375V5.75C7.375 6.80469 6.53125 7.625 5.5 7.625C4.44531 7.625 3.625 6.80469 3.625 5.75V2H4.375C4.5625 2 4.75 1.83594 4.75 1.625V0.875C4.75 0.6875 4.5625 0.5 4.375 0.5H1C0.789062 0.5 0.625 0.6875 0.625 0.875V1.625C0.625 1.83594 0.789062 2 1 2ZM10.375 11H0.625C0.414062 11 0.25 11.1875 0.25 11.375V12.125C0.25 12.3359 0.414062 12.5 0.625 12.5H10.375C10.5625 12.5 10.75 12.3359 10.75 12.125V11.375C10.75 11.1875 10.5625 11 10.375 11Z"
              fill="#4F4F4F"
            />
          </svg>
        </button>
      </div>
      <div class="inline-block relative z-0 px-[9px]">
        <div
          class="absolute z-1 w-[1px] h-4 top-[50%] translate-y-[-50%] right-0 bg-[#E5E8EF]"
        ></div>
        <button
          class="py-[5px] px-[7px] rounded font-medium text-gray-dark"
          @click="editor.chain().focus().setTextAlign('left').run()"
          :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }"
        >
          <svg
            width="11"
            height="11"
            viewBox="0 0 11 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.53125 7.75H6.69531C6.85938 7.75 7 7.63281 7 7.46875V6.55469C7 6.39062 6.85938 6.25 6.69531 6.25H0.53125C0.367188 6.25 0.25 6.39062 0.25 6.55469V7.46875C0.25 7.63281 0.367188 7.75 0.53125 7.75ZM0.53125 1.75H6.69531C6.85938 1.75 7 1.63281 7 1.46875V0.554688C7 0.390625 6.85938 0.25 6.69531 0.25H0.53125C0.367188 0.25 0.25 0.390625 0.25 0.554688V1.46875C0.25 1.63281 0.367188 1.75 0.53125 1.75ZM10.375 3.25H0.625C0.414062 3.25 0.25 3.4375 0.25 3.625V4.375C0.25 4.58594 0.414062 4.75 0.625 4.75H10.375C10.5625 4.75 10.75 4.58594 10.75 4.375V3.625C10.75 3.4375 10.5625 3.25 10.375 3.25ZM10.375 9.25H0.625C0.414062 9.25 0.25 9.4375 0.25 9.625V10.375C0.25 10.5859 0.414062 10.75 0.625 10.75H10.375C10.5625 10.75 10.75 10.5859 10.75 10.375V9.625C10.75 9.4375 10.5625 9.25 10.375 9.25Z"
            />
          </svg>
        </button>
        <button
          class="py-[5px] px-[7px] rounded font-medium text-gray-dark"
          @click="editor.chain().focus().setTextAlign('center').run()"
          :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }"
        >
          <svg
            width="11"
            height="11"
            viewBox="0 0 11 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.375 3.25H0.625C0.414062 3.25 0.25 3.4375 0.25 3.625V4.375C0.25 4.58594 0.414062 4.75 0.625 4.75H10.375C10.5625 4.75 10.75 4.58594 10.75 4.375V3.625C10.75 3.4375 10.5625 3.25 10.375 3.25ZM10.375 9.25H0.625C0.414062 9.25 0.25 9.4375 0.25 9.625V10.375C0.25 10.5859 0.414062 10.75 0.625 10.75H10.375C10.5625 10.75 10.75 10.5859 10.75 10.375V9.625C10.75 9.4375 10.5625 9.25 10.375 9.25ZM2.78125 1.75H8.19531C8.35938 1.75 8.5 1.63281 8.5 1.46875V0.554688C8.5 0.390625 8.35938 0.25 8.19531 0.25H2.78125C2.61719 0.25 2.5 0.390625 2.5 0.554688V1.46875C2.5 1.63281 2.61719 1.75 2.78125 1.75ZM8.19531 7.75C8.35938 7.75 8.5 7.63281 8.5 7.46875V6.55469C8.5 6.39062 8.35938 6.25 8.19531 6.25H2.78125C2.61719 6.25 2.5 6.39062 2.5 6.55469V7.46875C2.5 7.63281 2.61719 7.75 2.78125 7.75H8.19531Z"
            />
          </svg>
        </button>
        <button
          class="py-[5px] px-[7px] rounded font-medium text-gray-dark"
          @click="editor.chain().focus().setTextAlign('right').run()"
          :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }"
        >
          <svg
            width="11"
            height="11"
            viewBox="0 0 11 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.625 4.75H10.375C10.5625 4.75 10.75 4.58594 10.75 4.375V3.625C10.75 3.4375 10.5625 3.25 10.375 3.25H0.625C0.414062 3.25 0.25 3.4375 0.25 3.625V4.375C0.25 4.58594 0.414062 4.75 0.625 4.75ZM10.375 9.25H0.625C0.414062 9.25 0.25 9.4375 0.25 9.625V10.375C0.25 10.5859 0.414062 10.75 0.625 10.75H10.375C10.5625 10.75 10.75 10.5859 10.75 10.375V9.625C10.75 9.4375 10.5625 9.25 10.375 9.25ZM10.4453 0.25H4.28125C4.11719 0.25 4 0.390625 4 0.554688V1.46875C4 1.63281 4.11719 1.75 4.28125 1.75H10.4453C10.6094 1.75 10.75 1.63281 10.75 1.46875V0.554688C10.75 0.390625 10.6094 0.25 10.4453 0.25ZM10.4453 6.25H4.28125C4.11719 6.25 4 6.39062 4 6.55469V7.46875C4 7.63281 4.11719 7.75 4.28125 7.75H10.4453C10.6094 7.75 10.75 7.63281 10.75 7.46875V6.55469C10.75 6.39062 10.6094 6.25 10.4453 6.25Z"
            />
          </svg>
        </button>
      </div>
      <div class="inline-block relative z-0 px-[9px]">
        <div
          class="absolute z-1 w-[1px] h-4 top-[50%] translate-y-[-50%] right-0 bg-[#E5E8EF]"
        ></div>
        <button
          class="py-[5px] px-[7px] rounded font-medium text-gray-dark"
          @click="editor.chain().focus().toggleBulletList().run()"
          :class="{ 'is-active': editor.isActive('bulletList') }"
        >
          <svg
            width="12"
            height="11"
            viewBox="0 0 12 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.875 8.125H0.375C0.164062 8.125 0 8.3125 0 8.5V10C0 10.2109 0.164062 10.375 0.375 10.375H1.875C2.0625 10.375 2.25 10.2109 2.25 10V8.5C2.25 8.3125 2.0625 8.125 1.875 8.125ZM1.875 0.625H0.375C0.164062 0.625 0 0.8125 0 1V2.5C0 2.71094 0.164062 2.875 0.375 2.875H1.875C2.0625 2.875 2.25 2.71094 2.25 2.5V1C2.25 0.8125 2.0625 0.625 1.875 0.625ZM1.875 4.375H0.375C0.164062 4.375 0 4.5625 0 4.75V6.25C0 6.46094 0.164062 6.625 0.375 6.625H1.875C2.0625 6.625 2.25 6.46094 2.25 6.25V4.75C2.25 4.5625 2.0625 4.375 1.875 4.375ZM11.625 8.5H4.125C3.91406 8.5 3.75 8.6875 3.75 8.875V9.625C3.75 9.83594 3.91406 10 4.125 10H11.625C11.8125 10 12 9.83594 12 9.625V8.875C12 8.6875 11.8125 8.5 11.625 8.5ZM11.625 1H4.125C3.91406 1 3.75 1.1875 3.75 1.375V2.125C3.75 2.33594 3.91406 2.5 4.125 2.5H11.625C11.8125 2.5 12 2.33594 12 2.125V1.375C12 1.1875 11.8125 1 11.625 1ZM11.625 4.75H4.125C3.91406 4.75 3.75 4.9375 3.75 5.125V5.875C3.75 6.08594 3.91406 6.25 4.125 6.25H11.625C11.8125 6.25 12 6.08594 12 5.875V5.125C12 4.9375 11.8125 4.75 11.625 4.75Z"
            />
          </svg>
        </button>
        <button
          class="py-[5px] px-[7px] rounded font-medium text-gray-dark"
          @click="editor.chain().focus().toggleOrderedList().run()"
          :class="{ 'is-active': editor.isActive('orderedList') }"
        >
          <svg
            width="13"
            height="11"
            viewBox="0 0 13 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.42969 8.89844L2.85156 8.42969C2.92188 8.35938 2.96875 8.21875 2.96875 8.125V8.10156V8.03125C2.96875 7.84375 2.875 7.75 2.71094 7.75H1.375C1.25781 7.75 1.1875 7.84375 1.1875 7.9375V8.3125C1.1875 8.42969 1.25781 8.5 1.375 8.5H1.89062C1.82031 8.59375 1.70312 8.71094 1.63281 8.80469L1.51562 8.96875C1.42188 9.08594 1.375 9.20312 1.44531 9.32031L1.46875 9.36719C1.53906 9.48438 1.60938 9.53125 1.75 9.53125H1.86719C2.10156 9.53125 2.24219 9.60156 2.24219 9.76562C2.24219 9.85938 2.14844 9.95312 1.91406 9.95312C1.79688 9.95312 1.63281 9.90625 1.53906 9.88281C1.39844 9.78906 1.25781 9.78906 1.16406 9.95312L1.04688 10.1641C0.953125 10.3047 0.976562 10.4453 1.11719 10.5391C1.28125 10.6562 1.58594 10.75 1.98438 10.75C2.78125 10.75 3.10938 10.2344 3.10938 9.71875C3.10938 9.39062 2.89844 9.03906 2.42969 8.89844ZM12.625 4.75H5.125C4.91406 4.75 4.75 4.9375 4.75 5.125V5.875C4.75 6.08594 4.91406 6.25 5.125 6.25H12.625C12.8125 6.25 13 6.08594 13 5.875V5.125C13 4.9375 12.8125 4.75 12.625 4.75ZM12.625 1H5.125C4.91406 1 4.75 1.1875 4.75 1.375V2.125C4.75 2.33594 4.91406 2.5 5.125 2.5H12.625C12.8125 2.5 13 2.33594 13 2.125V1.375C13 1.1875 12.8125 1 12.625 1ZM12.625 8.5H5.125C4.91406 8.5 4.75 8.6875 4.75 8.875V9.625C4.75 9.83594 4.91406 10 5.125 10H12.625C12.8125 10 13 9.83594 13 9.625V8.875C13 8.6875 12.8125 8.5 12.625 8.5ZM1.375 3.25H2.875C2.96875 3.25 3.0625 3.17969 3.0625 3.0625V2.6875C3.0625 2.59375 2.96875 2.5 2.875 2.5H2.5V0.4375C2.5 0.34375 2.40625 0.25 2.3125 0.25H1.75C1.67969 0.273438 1.60938 0.296875 1.5625 0.367188L1.375 0.742188C1.375 0.765625 1.375 0.789062 1.375 0.8125C1.375 0.929688 1.44531 1 1.5625 1H1.75V2.5H1.375C1.25781 2.5 1.1875 2.59375 1.1875 2.6875V3.0625C1.1875 3.17969 1.25781 3.25 1.375 3.25ZM1.28125 7H2.875C2.96875 7 3.0625 6.92969 3.0625 6.8125V6.4375C3.0625 6.34375 2.96875 6.25 2.875 6.25H1.96094C2.03125 6.01562 3.08594 5.82812 3.08594 4.9375C3.08594 4.25781 2.5 4 2.05469 4C1.53906 4 1.25781 4.23438 1.09375 4.44531C1 4.58594 1.02344 4.70312 1.16406 4.82031L1.375 4.96094C1.49219 5.07812 1.63281 5.03125 1.75 4.91406C1.79688 4.86719 1.89062 4.82031 1.96094 4.82031C2.05469 4.82031 2.17188 4.86719 2.17188 5.03125C2.19531 5.33594 1 5.54688 1 6.64844V6.74219C1 6.90625 1.11719 7 1.28125 7Z"
              fill="#323F48"
            />
          </svg>
        </button>
        <button
          class="py-[5px] px-[7px] rounded font-medium text-gray-dark"
          @click="editor.chain().focus().toggleTaskList().run()"
          :class="{ 'is-active': editor.isActive('taskList') }"
        >
          <svg
            width="12"
            height="11"
            viewBox="0 0 12 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.25781 0.34375C3.21094 0.296875 3.11719 0.25 3.07031 0.25C3 0.25 2.90625 0.296875 2.85938 0.34375L1.35938 1.82031L0.84375 1.30469C0.796875 1.25781 0.703125 1.23438 0.632812 1.23438C0.5625 1.23438 0.492188 1.25781 0.445312 1.30469L0.0703125 1.67969C0.0234375 1.72656 0 1.82031 0 1.86719C0 1.9375 0.0234375 2.03125 0.0703125 2.07812L1.19531 3.17969C1.24219 3.22656 1.33594 3.27344 1.38281 3.27344C1.45312 3.27344 1.54688 3.22656 1.59375 3.17969L1.96875 2.82812L3.65625 1.11719C3.70312 1.09375 3.75 1 3.75 0.929688C3.75 0.859375 3.70312 0.765625 3.65625 0.71875L3.25781 0.34375ZM3.25781 4.07031C3.21094 4.02344 3.11719 4 3.07031 4C3 4 2.90625 4.02344 2.85938 4.07031L1.35938 5.57031L0.84375 5.05469C0.796875 5.00781 0.703125 4.96094 0.632812 4.96094C0.5625 4.96094 0.492188 5.00781 0.445312 5.05469L0.0703125 5.40625C0.0234375 5.45312 0 5.54688 0 5.61719C0 5.6875 0.0234375 5.78125 0.0703125 5.80469L1.19531 6.92969C1.24219 6.97656 1.3125 7.02344 1.38281 7.02344C1.45312 7.02344 1.54688 6.97656 1.59375 6.92969L1.96875 6.55469L3.65625 4.86719C3.70312 4.82031 3.75 4.72656 3.75 4.67969C3.75 4.60938 3.70312 4.51562 3.65625 4.46875L3.25781 4.07031ZM1.5 8.125C0.867188 8.125 0.351562 8.64062 0.351562 9.25C0.351562 9.88281 0.867188 10.375 1.5 10.375C2.10938 10.375 2.625 9.88281 2.625 9.25C2.625 8.64062 2.10938 8.125 1.5 8.125ZM11.625 8.5H4.875C4.66406 8.5 4.5 8.6875 4.5 8.875V9.625C4.5 9.83594 4.66406 10 4.875 10H11.625C11.8125 10 12 9.83594 12 9.625V8.875C12 8.6875 11.8125 8.5 11.625 8.5ZM11.625 1H4.875C4.66406 1 4.5 1.1875 4.5 1.375V2.125C4.5 2.33594 4.66406 2.5 4.875 2.5H11.625C11.8125 2.5 12 2.33594 12 2.125V1.375C12 1.1875 11.8125 1 11.625 1ZM11.625 4.75H4.875C4.66406 4.75 4.5 4.9375 4.5 5.125V5.875C4.5 6.08594 4.66406 6.25 4.875 6.25H11.625C11.8125 6.25 12 6.08594 12 5.875V5.125C12 4.9375 11.8125 4.75 11.625 4.75Z"
              fill="#323F48"
            />
          </svg>
        </button>
      </div>
      <div class="inline-block z-0 px-[9px]">
        <button
          class="py-[5px] px-[7px] rounded font-medium text-gray-dark"
          @click="editor.chain().focus().toggleStrike().run()"
          :class="{ 'is-active': editor.isActive('strike') }"
        >
          <svg
            width="12"
            height="11"
            viewBox="0 0 12 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.625 4.75H6.86719L4.82812 4.14062C4.42969 4 4.125 3.57812 4.125 3.15625C4.125 2.59375 4.57031 2.14844 5.13281 2.125H6.70312C7.10156 2.125 7.57031 2.42969 7.75781 2.78125C7.80469 2.89844 7.94531 2.99219 8.08594 2.99219C8.13281 2.99219 8.20312 2.96875 8.25 2.94531L9.25781 2.45312C9.375 2.38281 9.46875 2.24219 9.46875 2.10156C9.46875 2.05469 9.44531 1.98438 9.42188 1.9375V1.91406C8.95312 1 7.75781 0.25 6.72656 0.25H5.13281C3.53906 0.273438 2.22656 1.5625 2.22656 3.15625C2.22656 3.22656 2.25 3.36719 2.25 3.4375C2.29688 3.92969 2.48438 4.375 2.76562 4.75H0.375C0.164062 4.75 0 4.9375 0 5.125V5.875C0 6.08594 0.164062 6.25 0.375 6.25H11.625C11.8125 6.25 12 6.08594 12 5.875V5.125C12 4.9375 11.8125 4.75 11.625 4.75ZM7.38281 7C7.64062 7.16406 7.85156 7.5625 7.875 7.86719C7.85156 8.42969 7.40625 8.875 6.84375 8.875H5.27344C4.875 8.875 4.40625 8.59375 4.24219 8.24219C4.17188 8.125 4.03125 8.03125 3.89062 8.03125C3.84375 8.03125 3.77344 8.05469 3.72656 8.07812L2.71875 8.57031C2.60156 8.64062 2.50781 8.78125 2.50781 8.92188C2.50781 8.96875 2.53125 9.03906 2.55469 9.08594V9.10938C3.02344 10.0234 4.21875 10.75 5.25 10.75H6.84375C8.4375 10.75 9.75 9.46094 9.75 7.86719C9.75 7.79688 9.72656 7.65625 9.72656 7.58594C9.70312 7.42188 9.65625 7.16406 9.60938 7H7.38281Z"
            />
          </svg>
        </button>
      </div>
    </div>
    <editor-content
      :editor="editor"
      class="editor-field max-h-80 overflow-auto border border-[#EBEBF0] rounded-b"
    />
    <div v-if="prop_open_variant" class="mt-4">
      <v-dropdown-variant @emitClickVariant="onClickVariant" />
    </div>
  </div>
</template>

<script>
import StarterKit from "@tiptap/starter-kit";
import { Editor, EditorContent } from "@tiptap/vue-2";
import Underline from "@tiptap/extension-underline";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import Strike from "@tiptap/extension-strike";
import NodeView from "@/custom_extensions/variant/index";
import FontSize from "@/custom_extensions/fontSize/index";
import HeadingCustom from "@/custom_extensions/heading/index";
import VDropdownVariant from "./VDropdownVariant.vue";
import VSelectEditor from "./VSelectEditor.vue";

export default {
  components: {
    EditorContent,
    VDropdownVariant,
    VSelectEditor,
  },
  props: {
    prop_email_content: {
      default: "",
    },
    prop_open_variant: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      editor: null,
    };
  },
  methods: {
    onClickVariant(value) {
      this.editor.chain().focus().setVariant({ id: value }).run();
    },
    hanldeSetHeading(value) {
      if (value == "") {
        this.editor.chain().focus().setParagraph().run();
      } else {
        this.editor.chain().focus().toggleHeading({ level: value }).run();
      }
    },
    hanldeSetFontSize(value) {
      this.editor.chain().focus().setFontSize({ size: value }).run();
    },
  },
  computed: {
    select_heading: {
      get() {
        for (let i = 1; i < 6; i++) {
          let is_heading = this.editor.isActive("heading", { level: i });
          if (is_heading) {
            return i;
          }
        }
        return 0;
      },
      set(value) {
        this.hanldeSetHeading(value);
        this.$emit("input", value);
      },
    },
    select_font_size: {
      get() {
        for (let i = 11; i <= 56; i++) {
          let is_fontSize = this.editor.isActive("font_size", { size: i });
          if (is_fontSize) {
            return i;
          }
        }
        return 14;
      },
      set(value) {
        console.log(value);
        this.hanldeSetFontSize(value);
        this.$emit("input", value);
      },
    },
  },
  mounted() {
    this.editor = new Editor({
      extensions: [
        StarterKit,
        HeadingCustom,
        Paragraph,
        Text,
        Underline,
        TextStyle,
        Strike,
        FontSize,
        TaskList,
        TaskItem.configure({
          nested: true,
          HTMLAttributes: {
            style: "display: flex;gap:5px;align-items:flex-end",
          },
        }),
        BulletList.configure({
          HTMLAttributes: {
            style: "display: block;list-style-type: disc;padding: 0 1rem;",
          },
        }),
        OrderedList.configure({
          HTMLAttributes: {
            style: "display: block;list-style-type: decimal;padding: 0 1rem;",
          },
        }),
        TextAlign.configure({
          types: ["heading", "paragraph"],
        }),
        NodeView,
      ],
      content: this.prop_email_content,
    });

    this.editor.on("update", ({ editor }) => {
      let string = editor.getHTML();
      let htmlObject = document.createElement("div");
      htmlObject.style = "white-space: pre-wrap;";
      htmlObject.innerHTML = string;
      let newString = htmlObject.outerHTML;
      console.log(newString.length);
      this.$emit("emitUpdateEmailContent", newString);
    });
  },

  beforeUnmount() {
    this.editor.destroy();
  },
};
</script>

<style lang="scss" scoped>
.editor-field::v-deep(.ProseMirror) {
  outline: none;
  min-height: 112px;
  padding: 12px 5px;
  line-break: anywhere;
}
.ProseMirror [contenteditable="false"] {
  white-space: normal;
}

button {
  & svg {
    path {
      fill: currentColor;
    }
  }
}
.is-active {
  color: #3d56a6;
  background: #e2eaf4;
}
</style>
